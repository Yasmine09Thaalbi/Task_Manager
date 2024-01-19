import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task_manager';
  isLoggedIn = true;
  showdiv = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  login() {
    this.isLoggedIn = true;
    this.showdiv = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.showdiv = false;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isHomePage = this.activatedRoute.firstChild?.snapshot.routeConfig?.path === 'home/:username';
        const isLoginPage = this.activatedRoute.firstChild?.snapshot.routeConfig?.path === 'login';
        const isSignupPage = this.activatedRoute.firstChild?.snapshot.routeConfig?.path === 'signup';
        if ((isLoginPage || isSignupPage) && this.isLoggedIn) {
          this.showdiv = false;
        } else if (isHomePage && this.isLoggedIn) {
          this.isLoggedIn = false;
          this.showdiv = false;
        } 
      }
    });
  }
}
