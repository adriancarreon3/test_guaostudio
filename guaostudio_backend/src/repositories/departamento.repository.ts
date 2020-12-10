import {DefaultCrudRepository} from '@loopback/repository';
import {Departamento, DepartamentoRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id_departamento,
  DepartamentoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Departamento, dataSource);
  }
}
