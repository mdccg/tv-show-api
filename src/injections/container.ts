import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';
import { Db, MongoClient } from 'mongodb';
import { IShowDAO } from './../dao/IShowDAO';
import { ShowDAO as ShowMongoDAO } from './../dao/mongodb/ShowDAO';
import { ShowDAO as ShowPrismaDAO } from './../dao/prisma/ShowDAO';
import { TYPES } from './types';

export const getContainer = async (database: 'mongodb' | 'postgres'): Promise<Container> => {
  const container = new Container();

  switch(database) {
    case 'mongodb':
      const connection = await MongoClient.connect('mongodb://localhost:27017');
      const db = connection.db('tvshows-mongo');
      container.bind<Db>(TYPES.DbConnector).toConstantValue(db);
      container.bind<IShowDAO>(TYPES.IShowDAO).to(ShowMongoDAO);
      break;
      
    case 'postgres':
      const client = new PrismaClient();
      container.bind<PrismaClient>(TYPES.DbConnector).toConstantValue(client);
      container.bind<IShowDAO>(TYPES.IShowDAO).to(ShowPrismaDAO);
      break;
  }

  console.log(`Database ${database} connected`);
    
  return container;
}