import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Get the JWT token from the request headers
  const token: string | undefined = req.headers.authorization;

  // Verify and decode the token
  jwt.verify(token as string, "varthak", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the decoded token to the request object
    const user = (decoded as JwtPayload);
    req.body.user = user;
    next();
  });
};

export { authMiddleware };