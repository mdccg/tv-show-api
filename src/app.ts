import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { showsRouter } from './routes/shows';

export const app = express();

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Rotas
app.use('/shows', showsRouter);

app.get('/', (req, res) => res.send('TV Show API'));