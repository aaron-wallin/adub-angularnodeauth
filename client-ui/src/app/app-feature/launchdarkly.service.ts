import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { initialize, LDClient, LDFlagSet } from 'ldclient-js';

@Injectable()
export class LaunchDarklyService {
  ldClient: LDClient;
  flags: LDFlagSet;
  flagChange: Subject<Object> = new Subject<Object>();

  constructor() {
    console.log('constructor of launchdarklyservice');

    this.flags = {'daily-deals-feature': false};

    this.ldClient = initialize('5b5220e1c4ea4f2d74b24371',
      { key: 'test@example.com', anonymous: true });

    this.ldClient.on('change', (flags) => {
      if (flags['daily-deals-feature'] !== undefined) {
        this.flags['daily-deals-feature'] = flags['daily-deals-feature'];
      }
      this.flagChange.next(this.flags);
      console.log('Flags updated.');
   });

   this.ldClient.on('ready', () => {
     this.setFlags();
   } );
  }

  setFlags() {
    this.flags = this.ldClient.allFlags();
    console.log('Flags initialized.');
  }

  changeUser(user) {
    if (user !== 'Anonymous') {
      this.ldClient.identify({key: user, name: user, anonymous: false});
    } else {
      this.ldClient.identify({key: 'anon', anonymous: true});
    }
  }
 }
