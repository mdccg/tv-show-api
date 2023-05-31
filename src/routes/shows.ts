import { Router } from 'express';
import { getAsynchronousShowController } from './../controllers/ShowController';

export const showsRouter = Router();

(async () => {
  const showController = await getAsynchronousShowController();
  showsRouter.post('/', (req, res) => showController.save(req, res));
  showsRouter.get('/:title', (req, res) => showController.retrieveByTitle(req, res));
})();