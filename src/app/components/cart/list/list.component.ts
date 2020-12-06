import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ICartIngredient} from 'src/app/entities/cart-ingredient.model';
import {CurrentCartService} from 'src/app/service/current-cart.service';

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

  constructor(public service: CurrentCartService) {
  }

  ngOnInit(): void {
    this.visibilityAll$.subscribe((vis) => this.updateVisibility(vis));
    this.civ = this.service.ci;
    this.service.ci$.subscribe(() => {
      this.setVisible();
      this.totalIngredients = this.service.ci.length;
    });
  }

  getVisible(lst: ICartIngredient[]): ICartIngredient[] {
    const statusList = this.visibility ? ['PENDING', 'ACTIVE'] : ['PENDING'];
    return lst.filter((x) => {
      return statusList.includes(x.status.toUpperCase());
    });
  }

  sort(): void {
    this.civ.sort((a: any, b: any) => {
      const x = a.status.toUpperCase();
      const y = b.status.toUpperCase();
      return y.localeCompare(x);
    });
  }

  updateVisibility(visibility: boolean): void {
    this.visibility = visibility;
    this.setVisible();
    this.service.ci$.next();
    this.sort();
  }

  checkVisibility(ci: ICartIngredient): void {
    if (!this.visibility && ci.status.toUpperCase() !== 'PENDING') {
      this.civ.splice(this.civ.indexOf(ci), 1);
    }
    this.service.setStats();
  }

  private setVisible(): void {
    this.civ = this.getVisible(this.service.ci);
  }
}
