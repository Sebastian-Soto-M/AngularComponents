import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CurrentCartService } from 'src/app/service/current-cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() visibilityAll$: BehaviorSubject<boolean>;
  visibility = true;
  totalIngredients = 0;

  civ: ICartIngredient[] = [];

  constructor(public service: CurrentCartService) {}

  ngOnInit(): void {
    this.visibilityAll$.subscribe((visibility) => {
      this.visibility = visibility;
      this.setVisible();
      this.service.ci$.next(null);
    });
    this.civ = this.service.ci;
    this.service.ci$.subscribe(() => {
      this.setVisible();
      this.totalIngredients = this.service.ci.length;
    });
  }

  private setVisible() {
    this.civ = this.getVisible(this.service.ci);
  }

  getVisible(lst: ICartIngredient[]): ICartIngredient[] {
    const statusList = this.visibility ? ['PENDING', 'ACTIVE'] : ['PENDING'];
    return lst
      .filter((x) => {
        console.warn(x);
        return statusList.includes(x.status.toUpperCase());
      })
      .sort((a: any, b: any) => {
        let x = a.status.toUpperCase(),
          y = b.status.toUpperCase();
        return y.localeCompare(x);
      });
  }
}
