import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  password: string = '';
  email: string = '';

  onSubmit() {
    console.log('Signup form submitted:', this.firstname, this.lastname, this.username, this.password, this.email);
  }

}
