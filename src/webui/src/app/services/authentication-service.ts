
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import { Router } from '@angular/router';
import {User} from "../model/user";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")!));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentTokenValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>( environment.api_url + '/api/token', {username, password})
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }
  isLoggin(){
    return localStorage.getItem('currentUser');
  }

  register(registerData:any) {
    return this.http.post<any>( environment.api_url + '/api/token/register', registerData)
      .pipe(map(resp => {
        return resp;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
