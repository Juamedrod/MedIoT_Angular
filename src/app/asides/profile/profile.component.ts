import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/user.interface';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {

  }

}
