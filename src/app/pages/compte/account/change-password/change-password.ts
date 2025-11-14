import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/AuthService';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-change-password',
  imports: [ButtonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {

  oldPassword: string = '';
  newPassword: string = ''
  confirmPassword: string = '';

  changePassword() {
    const authService = new AuthService();
    if(this.oldPassword !== authService.getPassword()) {
      console.log("Ancien mot de passe incorrect");
      return;
    }
    if(this.newPassword !== this.confirmPassword) {
      console.log("Les nouveaux mots de passe ne correspondent pas");
      return;
    }
    authService.setPassword(this.newPassword);
    authService.save();
    console.log("Mot de passe changé avec succès");
  }

}
