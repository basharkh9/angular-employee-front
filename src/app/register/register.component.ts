import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}
  register() {
    this.authService.register(this.model).subscribe({
      next: (v) => {
        this.alertify.success('Registeration Successful.');
      },
      error: (e) => {
        this.alertify.error(e);
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
