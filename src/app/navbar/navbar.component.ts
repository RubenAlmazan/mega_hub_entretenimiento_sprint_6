import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: '../app.component.css'
})
export class NavbarComponent {
  visible(): void {
    const navbarJuegos = document.querySelector('.navbar-juegos') as HTMLElement;

    if (navbarJuegos.style.display === 'none') {
      navbarJuegos.style.display = 'block';
    }
    else {
      navbarJuegos.style.display = 'none';
    }

  }
}
