import { Component, Input, OnInit } from '@angular/core';
import { User } from '../_models/user.interface';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() user: User | null = null;
  constructor() {}

  ngOnInit(): void {}
}
