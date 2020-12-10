import {Entity, model, property} from '@loopback/repository';

@model()
export class Blog extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_blog?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
    default: '$now',
  })
  fecha?: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @property({
    type: 'object',
    required: true,
  })
  departamento: object;


  constructor(data?: Partial<Blog>) {
    super(data);
  }
}

export interface BlogRelations {
  // describe navigational properties here
}

export type BlogWithRelations = Blog & BlogRelations;
