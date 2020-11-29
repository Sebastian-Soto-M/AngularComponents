import { Component, Input, OnInit } from '@angular/core';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() list!: ICartIngredient[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.list);
  }

  //TODO create a pipe to toggle the selected items view on the list.
}
