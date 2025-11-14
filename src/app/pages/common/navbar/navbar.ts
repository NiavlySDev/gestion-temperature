import { Component } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/AuthService';
import { PageType } from './PageType';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  Routes: {
    label: string;
    color: string;
    route: string;
    pageType?: PageType;
  }[] = [
    { 
      label: 'Accueil', 
      color: 'blue', 
      route: '/main'
    },
    { 
      label: 'Températures', 
      color: 'green', 
      route: '/temperatures',
      pageType: PageType.LoggedIn
    },
    { 
      label: 'Consignes', 
      color: 'purple', 
      route: '/consignes',
      pageType: PageType.LoggedIn
    },
    { 
      label: 'Se Connecter', 
      color: 'orange', 
      route: '/login',
      pageType: PageType.LoggedOut
    },
    { 
      label: 'Compte', 
      color: 'orange', 
      route: '/account',
      pageType: PageType.LoggedIn
    },
    { 
      label: 'Déconnexion', 
      color: 'red', 
      route: '/logout',
      pageType: PageType.LoggedIn
    }
  ];

  ColorsToSeverity: { [key: string]: ButtonSeverity } = {
    black : 'primary',
    white : 'secondary',
    green : 'success',
    blue : 'info',
    orange : 'warn',
    purple : 'help',
    red : 'danger'
  };

  Visible: boolean = false;

  public pageType = PageType;

  constructor(private router: Router, public authService: AuthService) {
    this.authService = new AuthService();
  }

  navigate(navigateTo: string) {
    this.router.navigate([navigateTo]);
    this.toggleVisibility();
  }

  changeVisibility(isVisible: boolean) {
    this.Visible = isVisible;
  }

  toggleVisibility() {
    this.Visible = !this.Visible;
  }

  getSeverity(color: string): ButtonSeverity {
    return this.ColorsToSeverity[color] || 'primary';
  }
}
