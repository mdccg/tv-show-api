import { Show } from './../models/Show';
import { IGenericDAO } from './IGenericDAO';

export interface IShowDAO extends IGenericDAO<Show> {
  truncate(): Promise<boolean>;
  findByTitle(title: string): Promise<Show[]>;
}