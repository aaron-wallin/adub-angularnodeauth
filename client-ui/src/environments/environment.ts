import { configdata } from 'configdata';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  auth: {
    clientID: configdata.authClientId,
    domain: configdata.authDomain,
    audience: configdata.apiBaseUrl + '/',
    redirect: configdata.clientBaseUrl + '/callback',
    scope: 'openid profile email'
  }
};
