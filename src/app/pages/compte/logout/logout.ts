import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
})
export class Logout {

  constructor() {
    window.sessionStorage.removeItem("user");
    location.href = '/main';
  }

}
