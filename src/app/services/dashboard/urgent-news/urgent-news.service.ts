import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  of,
} from 'rxjs';
import { UrgentNewsHTTPService } from './urgent-news-http/urgent-news-http.service';

@Injectable({
  providedIn: 'root',
})
export class UrgentNewsService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private authService: AuthService,
    private urgentNewsHTTPService: UrgentNewsHTTPService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getUrgentNews(pageNumber: string) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.urgentNewsHTTPService
      .getUrgentNews(auth.authToken, pageNumber)
      .pipe(
        map((data) => {
          return data.data;
        }),
        catchError((err) => {
          console.error('err', err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  addUrgentContent(urgentContent: { Title: string; isUrgentNew: boolean }) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.urgentNewsHTTPService
      .addUrgentContent(auth.authToken, urgentContent)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((err) => {
          console.error('err', err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  toggleEnableUrgentNew(newId: string) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.urgentNewsHTTPService
      .toggleEnableUrgentNew(auth.authToken, newId)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((err) => {
          console.error('err', err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }
}
