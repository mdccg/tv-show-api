export interface IGenericDAO<T> {
  create(object: T): Promise<string>;
  update(id: string, object: any): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  findOne(id: string): Promise<T>;
  find(criteria: any, options?: any): Promise<T[]>;
}