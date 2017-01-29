import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../core/shared/auth.service';
import { LoggerService } from '../../core/shared/logger.service';


@Component({
  selector: 'sk-preferences-profile-nav',
  templateUrl: './preferences-profile-nav.component.html',
  styleUrls: ['./preferences-profile-nav.component.scss']
})
export class PreferencesProfileNavComponent implements OnInit {

  @Output() viewSelected = new EventEmitter();
  selectedView = 'thong_tin';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private loggerService: LoggerService) { }

  selectView(viewName: string) {
    this.selectedView = viewName;
    this.viewSelected.emit(this.selectedView);
  }

  onLogOut() {
    this.authService.logout()
      .subscribe(done => {
        this.router.navigate(['/dang-nhap']);
        this.loggerService.success('Bye : )', 'Đăng xuất thành công');
      });
  }

  ngOnInit() {
  }

}
