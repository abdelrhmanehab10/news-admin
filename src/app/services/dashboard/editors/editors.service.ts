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
import { EditorsHTTPService } from './editors-http/editors-http.service';

@Injectable({
  providedIn: 'root',
})
export class EditorsService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private authService: AuthService,
    private editorsHTTPService: EditorsHTTPService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getAllEditors(pageNumber?: number, search?: string) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.editorsHTTPService
      .getAllEditors(auth.authToken, pageNumber, search)
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

  addEditor(
    EditorName: string,
    Picture?: File,
    Description?: string,
    EditorEmail?: string
  ) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.editorsHTTPService
      .addEditor(auth.authToken, EditorName, Picture, Description, EditorEmail)
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

  toggleEnableEditor(editorId: string) {
    const auth = this.authService.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.editorsHTTPService
      .toggleEnableEditor(auth.authToken, editorId)
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
