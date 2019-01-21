import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CoreModule } from './app/core/core.module';
import { environment } from './environments/environment';

import 'hammerjs';

import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_0zPxh9jYK',
    userPoolWebClientId: '2svniqsuj4v23i7k140mlfqenb'
  }
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(CoreModule)
  .catch(err => console.error(err));
