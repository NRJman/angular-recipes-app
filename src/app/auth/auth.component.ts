import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromAuth from './store/auth.reducers';
import * as fromAuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public isSignupMode: boolean;
  public authForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAuth.State>
  ) { }

  onSubmit(): void {
    const formData = { email: this.authForm.value.email, password: this.authForm.value.password };

    if (this.isSignupMode) {
      this.store.dispatch(new fromAuthActions.StartSignUp(formData));
    } else {
      // const urlToGetBackAfterLogin: string = this.route.snapshot.queryParams['getBackTo'];
      this.store.dispatch(new fromAuthActions.StartSignIn(formData));
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
