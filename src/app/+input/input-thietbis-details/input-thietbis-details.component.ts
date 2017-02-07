import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LoggerService } from '../../core/shared/logger.service';
import { ThietBi } from '../../core/shared/thietbis.model';
import { ThietbisService } from '../../core/shared/thietbis.service';
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
    private router: Router,
    private loggerService: LoggerService,
    private thietBisService: ThietbisService,
  ) { }

  onSubmited(rawData: ThietBi) {
    if (this.selectedThietBi && this.selectedThietBi.$key) {
      this.thietBisService.resolveMetadataBeforeUpdate(rawData)
        .switchMap(preparedData =>
          this.thietBisService.update(this.selectedThietBi.$key, preparedData))
        .finally(() => this.inputThietbisFormComponent.submitting = false)
        .subscribe(
          success => {
            this.loggerService.success(`Thông tin về thiết bị ${rawData.maThietBi} đã được cập nhật vào hệ thống`, 'Cập nhật thành công', success)
          },
          error => this.loggerService.error(error.message, 'Cập nhật thất bại', error)
        );
    }
  }

  onRemoved() {
    if (this.selectedThietBi && this.selectedThietBi.$key) {
      this.thietBisService.remove(this.selectedThietBi.$key)
        .finally(() => {
          this.inputThietbisFormComponent.removing = false;
          this.inputThietbisFormComponent.submitting = false;
        })
        .subscribe(
          success => {
            this.loggerService.success(`Thiết bị đã được gỡ bỏ khỏi hệ thống`, 'Gỡ bỏ thành công', success)
            this.router.navigate(['/nhap-lieu/thiet-bi']);
          },
          error => this.loggerService.error(error.message, 'Gỡ bỏ thất bại', error)
        );
    } 
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
