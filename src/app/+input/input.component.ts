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
    // Seeding Data here...
    // this.thietbisImportService.getRawData()
    //   .subscribe(
    //     data => {
    //       if (data && data.length) {
    //         let preparedData = this.thietbisImportService.resolveRawData(data);
    //         this.thietbisImportService.seedData(preparedData);
    //       }            
    //     },
    //     error => console.error('error: ', error));
  }



}
