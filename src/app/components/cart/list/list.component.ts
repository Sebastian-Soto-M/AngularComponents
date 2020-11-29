import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { Status } from 'src/app/status.enum';

@Component({
  selector: 'app-cart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() list!: ICartIngredient[];
  @Output() itemUpdate = new EventEmitter<ICartIngredient>();

  constructor() {}

  ngOnInit(): void {}

  delete(i: number) {
    alert('delete the item ' + i);
    this.itemUpdate.emit(this.list[i]);
  }

  info(i: number) {
    alert('info from item ' + i);
  }

  toggle(i: number) {
    this.list[i].status =
      this.list[i].status === Status.PENDING ? Status.ACTIVE : Status.PENDING;
    this.itemUpdate.emit(this.list[i]);
  }

  //TODO create a pipe to toggle the selected items view on the list.
}
