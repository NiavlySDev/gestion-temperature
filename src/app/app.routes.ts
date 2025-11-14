import { Routes } from '@angular/router';
import { Header } from './pages/common/header/header';
import { Main } from './pages/main/main';
import { Login } from './pages/compte/login/login';
import { Logout } from './pages/compte/logout/logout';
import { Account } from './pages/compte/account/account';
import { Temperatures } from './pages/affichage/temperatures/temperatures';
import { Consignes } from './pages/affichage/consignes/consignes';

export const routes: Routes = [
  { path: 'main', component: Main },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'account', component: Account },
  { path: 'temperatures', component: Temperatures },
  { path: 'consignes', component: Consignes },
];
