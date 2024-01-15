import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task_manager';
  isLoggedIn = false;
  showdiv: boolean = true;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}


  
  login() {
    // Logique de connexion ici
    this.isLoggedIn = true;

  }

  // Fonction pour simuler la déconnexion
  logout() {
    // Logique de déconnexion ici
    this.isLoggedIn = false;
  }


  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'login' or 'signup' and hide the h1 accordingly
        this.showdiv = !['login', 'signup'].includes(this.activatedRoute.firstChild?.snapshot.routeConfig?.path as string);
      }
    });
  }
}

