import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}


  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', this.username, this.password)
  }

  goToSignup() {
    console.log('hello');
    this.router.navigate(['/signup']);
  }

}
