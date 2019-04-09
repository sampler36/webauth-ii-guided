const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();
const sessionConfig = {
  name: 'monkey doo',
 secret: 'we like banana',
 cookie: {
   maxAge: 1000 * 60 * 60,
   secure: false,
 },
 httpOnly: true, 
 resave: false,
 saveUninitialized: false,
 // storing in the data base
 store: new knexSessionStore({
   knex:require('../database/dbConfig'),
   tablename: 'sessions',
   sidfieldname: 'sid',
   createtable: true,
   clearInterval: 1000 * 60 * 60
 })
}

server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
