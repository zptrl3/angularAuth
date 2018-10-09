import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  token;
  errorText = '';
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authenticationService.logout();
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const body = {
      username: this.f.username.value,
      password: this.f.password.value
    };

    this.authenticationService.login(body).subscribe(
      res => {
        console.log(res);
        this.successLogin(res);
        },
      (err) => {
        console.log(err.status);
        this.errorParse(err);
      });
  }

  errorParse(res) {
    if (res.status === 403) {
      this.errorText = 'Username or Password is incorrect!';
      this.error = true;
    } else {
      this.errorText = 'Couldn\'t connect to server. Please try again later!';
      this.error = true;
    }
  }

  successLogin(res) {
    this.token = res.headers.get('Authorization');
    localStorage.setItem('currentUser', this.token);
    this.router.navigate(['']);
  }
}
