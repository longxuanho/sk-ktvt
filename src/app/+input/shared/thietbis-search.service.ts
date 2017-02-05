import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ThietbisSearchService {

  private searchTextSource = new Subject<string>();
  private searchBySource = new Subject<string>();

  searchText$ = this.searchTextSource.asObservable();
  searchBy$ = this.searchBySource.asObservable();

  constructor() { }

  doSearch(text: string) {
    this.searchTextSource.next(text);
  }

  setSearchBy(searchBy: string) {
    this.searchBySource.next(searchBy);
  }

}
