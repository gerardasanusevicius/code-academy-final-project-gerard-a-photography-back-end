import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import picturesRouter from './routers/pictures-router';
import authRouther from './routers/auth-router';
import config from './config';
import projectsRouter from './routers/projects-router';
import contactsRouter from './routers/contacts-router';
import aboutRouter from './routers/about-router';

const server = express();

// Middlewares
server.use(cors());
server.use(morgan(':method :url :status'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/pictures', picturesRouter);
server.use('/api/projects', projectsRouter);
server.use('/api/contacts', contactsRouter);
server.use('/api/about', aboutRouter);
server.use('/api/auth', authRouther);

mongoose.connect(
  config.db.connectionUrl,
  {
    retryWrites: true,
    w: 'majority',
  },
  (error) => {
    if (error) {
      console.log(`Failed to connect:\n${error.message}`);
      return;
    }
    console.log('Successfully connected to MongoDB');
    server.listen(1337, () => console.log('Application server is running on: http://localhost:1337'));
  },
);
