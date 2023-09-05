import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isConnected! : boolean
  constructor(private userService : UserService){}

  ngOnInit() {
    this.userService.connectionSubject.subscribe({
      next : (status : boolean) => {this.isConnected = status}
    })
    this.userService.emitConnectionStatus()
  }
}
