import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.model).subscribe({
      next: (v) => {
        this.alertify.success('Login Successful.');
      },
      error: (e) => {
        this.alertify.error(e);
      },
      complete: () => {
        this.router.navigate(['/employees']);
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');

    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
