import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'sensum',
  connector: 'cloudant',
  username: '77682139-7c4d-450f-94b9-c35936ca2201-bluemix',
  password: 'Prajesh@123',
  database: 'sensum',
  modelIndex: ''
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SensumDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'sensum';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.sensum', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
