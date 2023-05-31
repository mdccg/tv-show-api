import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from './../../injections/types';
import { Show } from './../../models/Show';
import { IShowDAO } from './../IShowDAO';
import { GenericDAO } from './GenericDAO';

@injectable()
export class ShowDAO extends GenericDAO<Show> implements IShowDAO {
  constructor(@inject(TYPES.DbConnector) client: PrismaClient) {
    super();
    
    this._model = client.show;
  }

  async truncate(): Promise<boolean> {
    const { count } = await this._model.deleteMany({});
    return count !== 0;
  }

  async findByTitle(title: string): Promise<Show[]> {
    const result = this._model.findMany({
      where: {
        title: {
          contains: title,
          mode: Prisma.QueryMode.insensitive,
        },
      },
    });
    
    return result;
  }  
}