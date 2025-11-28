import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-match-list',
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <app-match-profile *ngFor="let item of items" [name]="item.name" [type]="item.type" [position]="item.position" [neighborhood]="item.neighborhood" [sport]="item.sport" [age]="item.age" [neededPositions]="item.neededPositions"></app-match-profile>
    </div>
  `
})
export class MatchListComponent {
  @Input() items: any[] = [];
}
