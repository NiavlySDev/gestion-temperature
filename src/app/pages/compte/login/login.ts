import { Component } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { AuthService } from '../../../auth/AuthService';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginField: string = '';
  passwordField: string = '';

  constructor(private AuthService: AuthService) {}

  public login() {
    this.AuthService.login(this.loginField, this.passwordField);
    if(this.AuthService.isLogged()) {
      console.log("Login successful");
      location.href = '/account';
    } else {
      console.log("Login failed");
    }
  }

}
