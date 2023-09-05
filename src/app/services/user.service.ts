import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/evironment';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url : string = environment.apiurl

  get isConnected() : boolean {
    return localStorage.getItem('token') ? true : false
  }

  connectionSubject : Subject<boolean> = new Subject<boolean>()

  emitConnectionStatus() {
    this.connectionSubject.next(this.isConnected)
  }
  constructor(
    private client : HttpClient
  ) { }

  login(email : string, pwd : string) {
    this.client.post(this.url + "user",
                    {email : email, password : pwd},
                    {responseType : 'text'})
      .subscribe({
        next : (token : any) =>
        {
          let infoUser: any = jwt_decode(token)
          console.log(infoUser)
          let user : User = {
            id : Number.parseInt(infoUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"]),
            email : infoUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            nickname : "albert",
            role : infoUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
          }

          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem("token", token)
          this.emitConnectionStatus()
        },
        error : (error) => {console.log(error.error)},
        complete : () => {console.log("aller bonne nuit loulou")}
      })

    //this.client.get<User[]>(this.url + 'user').subscribe((data) => console.log(data))
  }

  logout() {
    localStorage.clear()
    this.emitConnectionStatus();
  }
}
