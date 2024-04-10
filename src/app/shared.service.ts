import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _expand = new BehaviorSubject<boolean>(false);
  expand$ = this._expand.asObservable();

  toggleSideBar() {
    this._expand.next(!this._expand.value);
  }
}
