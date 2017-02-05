import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ThietbisSearchService } from '../shared/thietbis-search.service';

@Component({
  selector: 'sk-input-thietbis-list-search',
  templateUrl: './input-thietbis-list-search.component.html',
  styleUrls: ['./input-thietbis-list-search.component.scss']
})
export class InputThietbisListSearchComponent implements OnInit {

  thietBiSearchForm: FormGroup;
  search: FormControl;
  searchSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private thietbisSearchService: ThietbisSearchService
    ) { 
    this.buildForm();
  }

  buildForm() {
    this.search = this.formBuilder.control('');
    this.thietBiSearchForm = this.formBuilder.group({ 
      search: this.search
    });
  }

  subscribeFormChanges() {
    this.searchSub = this.search.valueChanges
      .debounceTime(1000)
      .subscribe(newVal => {
        this.thietbisSearchService.doSearch(newVal);
      });
  }

  ngOnInit() {
    this.subscribeFormChanges();
  }

  ngOnDestroy() {
    if (this.searchSub)
      this.searchSub.unsubscribe();
  }

}
