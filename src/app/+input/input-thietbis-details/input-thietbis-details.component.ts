import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LoggerService } from '../../core/shared/logger.service';
import { ThietBi } from '../shared/thietbis.model';
import { ThietbisService } from '../shared/thietbis.service';
import { InputThietbisFormComponent } from '../input-thietbis-form/input-thietbis-form.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-input-thietbis-details',
  templateUrl: './input-thietbis-details.component.html',
  styleUrls: ['./input-thietbis-details.component.scss']
})
export class InputThietbisDetailsComponent implements OnInit, OnDestroy {

  @ViewChild(InputThietbisFormComponent)
  private inputThietbisFormComponent: InputThietbisFormComponent;
  
  routeSub: Subscription;
  selectedThietBi: ThietBi;

  constructor(
    private route: ActivatedRoute,
    private loggerService: LoggerService,
    private thietBisService: ThietbisService,
  ) { }

  onSubmited(rawData: ThietBi) {
    // this.thietBisService.resolveMetadataBeforeAddNew(rawData)
    //   .switchMap(preparedData =>
    //     this.thietBisService.addNew(preparedData))
    //   .finally(() => {
    //       this.inputThietbisFormComponent.submitting = false;
    //   })
    //   .subscribe(
    //     success => {
    //       this.inputThietbisFormComponent.onReset();
    //       this.loggerService.success('Thiết bị mới đã được thêm vào hệ thống', 'Tạo mới thành công', success)
    //     },
    //     error => this.loggerService.error(error.message, 'Tạo mới thất bại', error)
    //   );
  }

  ngOnInit() {
    this.routeSub = this.route.params
      .switchMap((params: Params) => this.thietBisService.getThietBi(params["id"]))
      .subscribe((thietbi: ThietBi) => {
        this.selectedThietBi = thietbi;
        this.inputThietbisFormComponent.onReset(thietbi);
      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
