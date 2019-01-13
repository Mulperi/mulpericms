import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CognitoService } from './cognito.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public cognitoService: CognitoService, public router: Router) {}

  canActivate(): Observable<boolean> {
    return this.cognitoService
      .getSession()
      .pipe(map(session => (session.isValid() ? true : false)));
  }
}
