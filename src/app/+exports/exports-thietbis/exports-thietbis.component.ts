import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ThietbisService } from '../../core/shared/thietbis.service';
import { ThietBi } from '../../core/shared/thietbis.model';
import { LoggerService } from '../../core/shared/logger.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-exports-thietbis',
  templateUrl: './exports-thietbis.component.html',
  styleUrls: ['./exports-thietbis.component.scss']
})
export class ExportsThietbisComponent implements OnInit, OnDestroy {

  thietbis: ThietBi[] = [];
  isLoading: boolean;

  constructor(
    private locationService: Location,
    private thietbisService: ThietbisService,
    private loggerService: LoggerService
  ) { }

  goBack() {
    this.locationService.back();
  }

  handleError(error) {
    this.loggerService.error(error.message, 'Truy vấn thất bại.', error);
  }

  getAllThietBis() {
    this.isLoading = true;
    
    this.thietbisService.getAllThietBis()
      .subscribe(
        (thietbis: ThietBi[]) => {
          this.isLoading = false;
          this.thietbis = thietbis
        },
        (error: Error) => {
          this.isLoading = false;
          this.handleError(error);
        });
  }

  ngOnInit() {
    this.getAllThietBis();
  }

  ngOnDestroy() {
  }

}
