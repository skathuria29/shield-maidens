import {DefaultCrudRepository} from '@loopback/repository';
import {Users, UsersRelations} from '../models';
import {SensumDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.userId,
  UsersRelations
> {
  constructor(
    @inject('datasources.sensum') dataSource: SensumDataSource,
  ) {
    super(Users, dataSource);
  }
}
