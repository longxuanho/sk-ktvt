import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ThietbisSearchService {

  private searchTextSource = new Subject<string>();

  searchText$ = this.searchTextSource.asObservable();

  constructor() { }

  doSearch(text: string) {
    this.searchTextSource.next(text);
  }

}
