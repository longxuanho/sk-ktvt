import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputComponent } from './input.component';
import { InputThietbisListComponent } from './input-thietbis-list/input-thietbis-list.component';
import { InputThietbisListNavComponent } from './input-thietbis-list-nav/input-thietbis-list-nav.component';
import { InputThietbisListResultsComponent } from './input-thietbis-list-results/input-thietbis-list-results.component';
import { InputThietbisListResultsItemComponent } from './input-thietbis-list-results-item/input-thietbis-list-results-item.component';
import { InputThietbisDetailsComponent } from './input-thietbis-details/input-thietbis-details.component';
import { InputThietbisAddNewComponent } from './input-thietbis-add-new/input-thietbis-add-new.component';
import { InputThietbisListResultsStatisticsComponent } from './input-thietbis-list-results-statistics/input-thietbis-list-results-statistics.component';
import { InputThietbisFormComponent } from './input-thietbis-form/input-thietbis-form.component';

const routes: Routes = [
  {
    path: '',
    component: InputComponent,
    children: [
      { path: 'thiet-bi', pathMatch: 'full', component: InputThietbisListComponent },
      { path: 'thiet-bi/tao-moi', component: InputThietbisAddNewComponent },
      { path: 'thiet-bi/:id', component: InputThietbisDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InputRoutingModule { }

export const routedComponents = [
  InputComponent,
  InputThietbisListComponent,
  InputThietbisListNavComponent,
  InputThietbisListResultsComponent,
  InputThietbisListResultsItemComponent,
  InputThietbisDetailsComponent,
  InputThietbisAddNewComponent,
  InputThietbisListResultsStatisticsComponent,
  InputThietbisFormComponent
]