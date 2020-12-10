import {DefaultCrudRepository} from '@loopback/repository';
import {Blog, BlogRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BlogRepository extends DefaultCrudRepository<
  Blog,
  typeof Blog.prototype.id_blog,
  BlogRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Blog, dataSource);
  }
}
