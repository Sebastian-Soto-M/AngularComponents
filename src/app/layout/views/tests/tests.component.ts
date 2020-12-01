import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

interface Pet {
  id?: number;
  name?: string;
}

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit {
  private data$ = new Subject<Pet>();
  pets: Pet[] = [];

  constructor() {}

  ngOnInit(): void {
    this.data$.subscribe((x) => this.pets.push(x));
  }

  addPet() {
    const id = this.pets.length;
    this.data$.next({ id: id, name: `name_${id}` });
  }
}
