import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  private sidebarOpenSource = new BehaviorSubject<boolean>(false);
  public sidebarOpen$ = this.sidebarOpenSource.asObservable();

  openSidebar() {
    this.sidebarOpenSource.next(true);
  }

  closeSidebar() {
    this.sidebarOpenSource.next(false);
  }

  toggleSidebar() {
    this.sidebarOpenSource.next(!this.sidebarOpenSource.value);
  }
}
