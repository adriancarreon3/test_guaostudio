import {Entity, model, property} from '@loopback/repository';

@model()
export class Departamento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_departamento?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
