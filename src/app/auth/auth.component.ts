import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private routeParamsSubscription: Subscription;
  public isSignupMode: boolean;
  public authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  onSubmit(): void {
    const email: string = this.authForm.value.email,
      password: string = this.authForm.value.password;

    if (this.isSignupMode) {
      this.authService.createUser(email, password);
      this.router.navigate(['/recipe-book']);
    } else {
      const urlToGetBackAfterLogin: string = this.route.snapshot.queryParams['getBackTo'];

      this.authService.loginUser(email, password)
        .then(() => {
          if (urlToGetBackAfterLogin) {
            this.router.navigate([urlToGetBackAfterLogin]);
          } else {
            this.router.navigate(['/recipe-book']);
          }
        });
    }
  }

  initForm(accessType: string): void {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    switch (accessType) {
      case 'up':
        this.isSignupMode = true;
        break;

      case 'in':
        this.isSignupMode = false;
        break;

      default:
        this.router.navigate(['/page-not-found']);
    }
  }

  ngOnInit() {
    this.route.data.subscribe((params) => {
      this.initForm(params.accessType);
    });
  }
}
