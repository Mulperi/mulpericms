import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CoreModule } from './app/core/core.module';
import { environment } from './environments/environment';

import 'hammerjs';

import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_fefwJFUQo',
    userPoolWebClientId: 'gf1696ng6tpu3lfj0nhke5mj'
  }
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(CoreModule)
  .catch(err => console.error(err));
