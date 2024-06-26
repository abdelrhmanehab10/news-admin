import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  of,
} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DashboardHTTPService } from './dashboard-http/dashboard-http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private authService: AuthService,
    private dashboardHTTPService: DashboardHTTPService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
  getNewsCategories() {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.dashboardHTTPService.getNewsCategories(auth.authToken).pipe(
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

  getNewsSubCategories(id: string) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.dashboardHTTPService
      .getNewsSubCategories(auth.authToken, id)
      .pipe(
        map((data) => {
          console.log(data);

          return data.data;
        }),
        catchError((err) => {
          console.error('err', err);
          return of(undefined);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }
}
