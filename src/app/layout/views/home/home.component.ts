import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/entities/account.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  account: Account;

  constructor() {
    this.account = {
      id: 1,
      firstName: 'Sebastian',
      lastName: 'Soto',
      login: 'snsm',
    };
  }

  ngOnInit(): void {}
}
