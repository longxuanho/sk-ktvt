import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ThietbisService } from '../../core/shared/thietbis.service';
import { ThietBi } from '../../core/shared/thietbis.model';
import { Subscription } from 'rxjs/Subscription';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Component({
  selector: 'sk-exports-thietbis',
  templateUrl: './exports-thietbis.component.html',
  styleUrls: ['./exports-thietbis.component.scss']
})
export class ExportsThietbisComponent implements OnInit, OnDestroy {

  thietbis: ThietBi[] = [];

  thietbisSub: Subscription;

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
