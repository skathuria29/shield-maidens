import {ApplicationConfig, CommunitySupportMh} from './application';
import {SensumDataSource} from './datasources/sensum.datasource';
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  // --------- ADD THIS SNIPPET ---------
  // Set the port assigned for the app
  if (!options) options = {};
  if (!options.rest) options.rest = {};
  options.rest.port = appEnv.isLocal ? options.rest.port : appEnv.port;
  options.rest.host = appEnv.isLocal ? options.rest.host : appEnv.host;
  // --------- ADD THIS SNIPPET ---------
  const app = new CommunitySupportMh(options);


  // --------- ADD THIS SNIPPET ---------
  // If running on IBM Cloud, we get the Cloudant service details from VCAP_SERVICES
  if (!appEnv.isLocal) {
    // 'myCloudant' is the name of the provisioned Cloudant service
    const dbConfig = Object.assign({}, SensumDataSource.defaultConfig, {
      url: appEnv.getServiceURL('sensum-cloudant'),
    });
    app.bind('datasources.config.sensum').to(dbConfig);
  }

  // --------- ADD THIS SNIPPET ---------
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
