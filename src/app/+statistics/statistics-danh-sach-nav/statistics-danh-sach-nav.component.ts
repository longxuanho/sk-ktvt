import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sk-statistics-danh-sach-nav',
  templateUrl: './statistics-danh-sach-nav.component.html',
  styleUrls: ['./statistics-danh-sach-nav.component.scss']
})
export class StatisticsDanhSachNavComponent implements OnInit {

  @Input() numOfMatchingItems: number;

  constructor(private router: Router) { }

  getPage(page: number) {
    this.router.navigate(['/thong-ke/danh-sach'], { queryParams: { page } });
  }

  ngOnInit() {
  }

}
