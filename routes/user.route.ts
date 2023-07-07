import { Router, Request, Response } from 'express';
import { UserModel, User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userRouter: Router = Router();

userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

userRouter.post('/register', async (req: Request, res: Response) => {
  const { email, password, roles } = req.body;

  try {
    bcrypt.hash(password, 5, async (err: Error | undefined, secure_pwd: string) => {
      if (err) {
        console.log(err);
      } else {
        const user: User = new UserModel({ email, password: secure_pwd, roles });
        await user.save();

        res.send('User registered successfully');
      }
    });
  } catch (error) {
    console.log(error);
    res.send('Error in registering');
  }
});

userRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: User[] = await UserModel.find({ email });
    let hashed_pwd: string = user[0].password;

    if (user.length > 0) {
      bcrypt.compare(password, hashed_pwd, (err: Error | undefined, result: boolean) => {
        if (result) {
          const token: string = jwt.sign(
            { userID: user[0]._id, roles: user[0].roles },
            "varthak",
            { expiresIn: '2h' }
          );
          res.send({ msg: 'Login Successful', token });
        } else {
          res.send('Wrong credentials');
        }
      });
    } else {
      res.send('Wrong credentials');
    }
  } catch (error) {
    console.log(error);
    res.send('Error in login');
  }
});

export { userRouter };