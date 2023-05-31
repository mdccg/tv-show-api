import { injectable } from 'inversify';
import { IGenericDAO } from './../IGenericDAO';

@injectable()
export class GenericDAO<T> implements IGenericDAO<T> {
  protected _model: any;

  async create(object: T): Promise<string> {
    const savedObject = await this._model.create({ data: object });
    return savedObject.id;
  }

  async update(id: string, object: any): Promise<boolean> {
    const updatedObjectArg = {
      where: {
        id
      },
      data: object
    };

    const updatedObject = await this._model.update(updatedObjectArg);
    return !!updatedObject;
  }

  async delete(id: string): Promise<boolean> {
    const deletedObjectArg = {
      where: {
        id
      }
    };

    const deletedObject = await this._model.delete(deletedObjectArg);
    return !!deletedObject;
  }

  async findOne(id: string): Promise<T> {
    const foundObjectArg = {
      where: {
        id
      }
    };

    const foundObject = await this._model.findUnique(foundObjectArg);
    return foundObject;
  }

  async find(criteria: any, optionsArg?: any): Promise<T[]> {
    const options = optionsArg || {};

    const foundObjectsArg = {
      where: criteria,
      ...options
    };

    const foundObjects = await this._model.findMany(foundObjectsArg);
    return foundObjects;
  }
}