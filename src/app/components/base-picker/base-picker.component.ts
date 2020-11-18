import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-picker',
  templateUrl: './base-picker.component.html',
  styleUrls: ['./base-picker.component.scss'],
})
export class BasePickerComponent implements OnInit {
  @Input('options') options!: any;
  @Input('title') title!: string;
  selections: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
