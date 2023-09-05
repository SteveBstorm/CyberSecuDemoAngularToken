import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email! : string
  pwd! : string
  constructor(private userService : UserService){}

  login() {
    this.userService.login(this.email, this.pwd)
  }
}
