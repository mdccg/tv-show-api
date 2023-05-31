import { inject, injectable } from 'inversify';
import { Db } from 'mongodb';
import { TYPES } from './../../injections/types';
import { Show } from './../../models/Show';
import { IShowDAO } from './../IShowDAO';
import { GenericDAO } from './GenericDAO';

@injectable()
export class ShowDAO extends GenericDAO<Show> implements IShowDAO {
  constructor(@inject(TYPES.DbConnector) db: Db) {
    super();
    this._collection = db.collection('shows');
  }

  async truncate(): Promise<boolean> {
    const result = await this._collection.deleteMany({});
    return result.acknowledged;
  }

  async findByTitle(title: string): Promise<Show[]> {
    const docs = this._collection.find({
      title: {
        $regex: title,
        $options: 'i'
      }
    });
    const result: Show[] = [];
    for await (const doc of docs) {
      result.push(doc);
    }
    return result;
  }
}