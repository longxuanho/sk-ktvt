import { Component, OnInit } from '@angular/core';
import { ThietbisImportService } from './shared/thietbis-import.service';

@Component({
  selector: 'sk-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(
    private thietbisImportService: ThietbisImportService
    ) { }

  ngOnInit() {
    this.thietbisImportService.getRawData()
      .subscribe(
        data => {
          if (data && data.length)
            console.log('here: ', this.thietbisImportService.resolveThietBi(data[0]))
        },
        error => console.error('error: ', error));
  }



}
