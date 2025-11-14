import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Navbar } from './pages/common/navbar/navbar';
import { Footer } from './pages/common/footer/footer';
import { Header } from './pages/common/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, Navbar, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
