import { Component, OnInit, ViewChild } from '@angular/core';

import { LoggerService } from '../../core/shared/logger.service';
import { ThietBi } from '../shared/thietbis.model';
import { ThietbisService } from '../shared/thietbis.service';
import { InputThietbisFormComponent } from '../input-thietbis-form/input-thietbis-form.component';


@Component({
  selector: 'sk-input-thietbis-add-new',
  templateUrl: './input-thietbis-add-new.component.html',
  styleUrls: ['./input-thietbis-add-new.component.scss']
})
export class InputThietbisAddNewComponent implements OnInit {

  @ViewChild(InputThietbisFormComponent)
  private inputThietbisFormComponent: InputThietbisFormComponent;

  constructor(
    private loggerService: LoggerService,
    private thietBisService: ThietbisService,
  ) { 
  }

  onSubmited(rawData: ThietBi) {
    this.thietBisService.resolveMetadataBeforeAddNew(rawData)
      .switchMap(preparedData =>
        this.thietBisService.addNew(preparedData))
      .finally(() => {
          this.inputThietbisFormComponent.submitting = false;
      })
      .subscribe(
        success => {
          this.inputThietbisFormComponent.onReset();
          this.loggerService.success('Thiết bị mới đã được thêm vào hệ thống', 'Tạo mới thành công', success)
        },
        error => this.loggerService.error(error.message, 'Tạo mới thất bại', error)
      );
  }

  ngOnInit() {    
  }

}
