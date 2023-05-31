import { Request, Response } from 'express';
import { IShowDAO } from './../dao/IShowDAO';
import { getContainer } from './../injections/container';
import { TYPES } from './../injections/types';
import { Show } from './../models/Show';

export const getAsynchronousShowController = async () => {
  const container = await getContainer('postgres');
  const showDAO = container.get<IShowDAO>(TYPES.IShowDAO);
  const showController = new ShowController(showDAO);
  return showController;
}

export class ShowController {
  private _showDAO: IShowDAO;
  
  constructor(showDAO: IShowDAO) {
    this._showDAO = showDAO;
  }

  async save(req: Request, res: Response) {
    const { title, premiere, isRunning, language, mainGenre, posterUrl } = req.body;

    if (!(title && premiere && language && mainGenre)) {
      return res.status(400).json({ error: 'At least one mandatory field was not informed' });
    }

    const show = new Show({ title, premiere, isRunning, language, mainGenre, posterUrl });
    const id = await this._showDAO.create(show);
    res.status(201).json({ id });
  }

  async retrieveByTitle(req: Request, res: Response) {
    const { title } = req.params;
    const shows = await this._showDAO.findByTitle(title);
    res.status(200).json({ shows });
  }
}