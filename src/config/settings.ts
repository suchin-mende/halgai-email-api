import * as local from './env/env.local';
import * as development from './env/env';
import * as Stage from './env/env.stage';
import * as Production from './env/env.production';

const env = process.env.NODE_ENV || 'development';
let Settings;
switch (env) {
  case 'local':
    Settings = local.Settings;
    break;

  case 'stage':
    Settings = Stage.Settings;
    break;

  case 'production':
    Settings = Production.Settings;
    break;

  default:
    Settings = development.Settings;
    break;
}

export { Settings };
