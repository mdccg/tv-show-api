import { injectable } from 'inversify';
import { Collection, Document, Filter, ObjectId, OptionalUnlessRequiredId, UpdateFilter, UpdateOptions } from 'mongodb';
import { IGenericDAO } from './../IGenericDAO';

@injectable()
export abstract class GenericDAO<T extends Document> implements IGenericDAO<T> {
  protected _collection: Collection<T>;
  
  async create(object: T): Promise<string> {
    const result = await this._collection.insertOne(object as OptionalUnlessRequiredId<T>);
    return result.insertedId.toString();
  }

  async update(id: string, updateObject: any): Promise<boolean> {
    const filter = ({ _id: new ObjectId(id) }) as Filter<T>;
    const update: UpdateFilter<T> = { $set: updateObject };
    const options: UpdateOptions = { upsert: false };
    const result = await this._collection.updateOne(filter, update, options);
    return result.matchedCount === 1;
  }
  
  async delete(id: string): Promise<boolean> {
    const filter = ({ _id: new ObjectId(id) }) as Filter<T>;
    const result = await this._collection.deleteOne(filter);
    return result.deletedCount === 1;
  }
  
  async findOne(id: string): Promise<T> {
    const filter = ({ _id: new ObjectId(id) }) as Filter<T>;
    const result = await this._collection.findOne(filter);
    return result as T;
  }

  async find(criteria: any, options?: any): Promise<T[]> {
    const cursor = this._collection.find(criteria, options || {});
    const documents: T[] = [];
    for await (const item of cursor) {
      documents.push(item as T);
    }
    return documents;
  }
}