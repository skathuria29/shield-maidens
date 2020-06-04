import {Entity, model, property} from '@loopback/repository';

@model()
export class Users extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  userId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  birthDate: string;

  @property({
    type: 'number',
    required: true,
  })
  gender: number;

  @property({
    type: 'string',
  })
  emailId?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'number',
  })
  contactNumber?: number;


  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
