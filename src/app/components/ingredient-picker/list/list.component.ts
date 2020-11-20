import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input('searchText') searchText: string;
  @Input('options') options!: any[];
  @Output('selectionsOutput') selectionOutput = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  add(element: any): void {
    this.selectionOutput.emit(element);
  }
}
