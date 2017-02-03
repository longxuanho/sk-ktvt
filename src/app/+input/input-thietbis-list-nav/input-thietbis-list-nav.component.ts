import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sk-input-thietbis-list-nav',
  templateUrl: './input-thietbis-list-nav.component.html',
  styleUrls: ['./input-thietbis-list-nav.component.scss']
})
export class InputThietbisListNavComponent implements OnInit {

  constructor(private router: Router) { }

  getPage(page: number) {
    this.router.navigate(['/nhap-lieu/thiet-bi'], { queryParams: { page } });
  }

  ngOnInit() {
  }
  
}
