import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ApiHttpInterceptor } from './interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {  constructor(public auth: ApiHttpInterceptor, public router: Router) {}  canActivate(): boolean {
  if (!this.auth.isAuthenticated()) {
    console.log("Unauthenticated");
    this.router.navigate(['client']);
    return false;
  }

  console.log("Authenticated");
  return true;
}}
