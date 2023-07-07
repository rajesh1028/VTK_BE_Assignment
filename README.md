# VTK_BE_Assignment

This project is purely build on typescript. It makes users to register, login and create books and view books.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Testing](#testing)

## Introduction

The project is built on top of typescript. It makes users to register, login, create, view books in the database.

## Installation

To install this project in your system.
- clone the repository on your system.
- run npm i on the terminal opened inside the project to install the dependencies.
- change the fields required.

## API Documentation

### POST api/users/register -> To register with a new user
### POST api/users/login -> To login with the application
### GET api/users/books -> To view the books("CREATOR" & "VIEW_ALL" can be view all the books)
### POST api/users/books -> To create a book("CREATOR" can be able to post a post)
### GET api/users/books?new=1 -> To view the books created within 10 minutes
### GET api/users/books?old=1 -> To view the books created before 10 minutes

## Testing

- npx tsc -- watch -> To start run watch on typescript.
- node index.js -> To start the server on the system.

