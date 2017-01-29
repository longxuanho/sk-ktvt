import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-preferences-profile',
  templateUrl: './preferences-profile.component.html',
  styleUrls: ['./preferences-profile.component.scss']
})
export class PreferencesProfileComponent implements OnInit {

  selectedView = 'thong_tin';

  constructor() { }

  selectView(viewName: string) {
    this.selectedView = viewName;
  }

  ngOnInit() {
  }

}
