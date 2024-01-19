import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SignupService]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private signupService: SignupService) {}

  onSubmit() {
    this.signupService.login(this.username, this.password).subscribe(
      response => {
        console.log('Réponse du serveur:', response);
        if (response && response.status === 200) {
          this.router.navigate(['/home', this.username]);
        } else {
          console.error('Échec de la connexion. Veuillez vérifier vos informations.');
        }
      },
      error => {
        console.error('Erreur lors de la connexion:', error);
      }
    );
  }

  goToSignup() {
    console.log('hello');
    this.router.navigate(['/signup']);
  }
}
