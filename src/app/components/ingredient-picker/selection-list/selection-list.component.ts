import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ingredient-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss'],
})
export class SelectionListComponent implements OnInit {
  @Input() list!: FormGroup[];
  @Output() isEmpty = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  remove(index: number): void {
    this.list.splice(index, 1);
    if (this.list.length === 0) {
      this.isEmpty.emit(true);
    }
    this.isEmpty.emit(false);
  }
}
