import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { login } from '../login';
import { register } from '../register';
import { user } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {
  username: string;
  loggedIn: boolean= false;
  constructor(private httpClient: HttpClient) { } 
 
  login(){
    this.loggedIn=true;
  }
  logout(){
    this.loggedIn=false;
  }
  ifAuth(){
    return this.loggedIn;
  }

  getusers(user: login): Observable<any> {
    console.log("GET USER");
    console.log(user.email);
    console.log(user.password);

    return this.httpClient.post<any>(`http://localhost:8085/api/users/login`, user, { headers: new HttpHeaders().set('responseType', 'text') }).pipe(
      map(
        userData => {
          sessionStorage.setItem('email', user.email);
          this.username=user.email;
          let tokenStr = userData.token;
          console.log("Token string: " + tokenStr);
          localStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );

  }
  getCurUser(){
    return this.username;
  }

  addUser(register: register): Observable<register> {
    return this.httpClient.post<register>('http://localhost:8085/api/user/register', register);
  }

  setBearerToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  getBearerToken() {
    return sessionStorage.getItem('token');
  }

  
}
