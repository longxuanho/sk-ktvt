import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThietbisService } from '../../core/shared/thietbis.service';
import { ThietBi } from '../../core/shared/thietbis.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-exports-thietbis',
  templateUrl: './exports-thietbis.component.html',
  styleUrls: ['./exports-thietbis.component.scss']
})
export class ExportsThietbisComponent implements OnInit, OnDestroy {

  thietbis: ThietBi[] = [];

  constructor(
    private thietbisService: ThietbisService
  ) { }

  getAllThietBis() {
    this.thietbisService.getAllThietBis()
      .subscribe((thietbis: ThietBi[]) => this.thietbis = thietbis);
  }

  ngOnInit() {
    this.getAllThietBis();
  }

  ngOnDestroy() {
  }

}
