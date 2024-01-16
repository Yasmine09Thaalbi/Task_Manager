import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Signupdata } from '../classes/signupdata';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent {
  formData: Signupdata = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: ''
  };

  constructor(private signupService: SignupService, private router: Router) {}

  onSubmit() {
    this.signupService.enregistrerDonnees(this.formData).subscribe(
      response => {
        console.log('Réponse du serveur:', response);
        if (response && response.status === 200) {
          // Rediriger vers la page de connexion
          this.router.navigate(['/login']);
        } else {
          // Gérer d'autres cas si nécessaire
        }
      },
      error => {
        console.error('Erreur lors de l\'enregistrement des données:', error);
      }
    );
  }
}
