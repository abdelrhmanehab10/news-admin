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
import { AddNewHTTPService } from './add-new-http/add-new-http.service';

@Injectable({
  providedIn: 'root',
})
export class AddNewService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private authService: AuthService,
    private AddNewHTTPService: AddNewHTTPService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getContentTypes() {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.AddNewHTTPService.getContentNews(auth.authToken).pipe(
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
}
