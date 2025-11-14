import { Component } from '@angular/core';
import { AuthService } from '../../../auth/AuthService';
import { User } from '../../../auth/User';
import { Button } from 'primeng/button';
import { ChangePassword } from './change-password/change-password';

@Component({
  selector: 'app-account',
  imports: [Button, ChangePassword],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {

  AuthService: AuthService = new AuthService();
  Utilisateur : User | null = this.AuthService.getUtilisateur();
  showChangePassword: boolean = false;

  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
  }

}