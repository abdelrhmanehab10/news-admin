import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NEW } from 'src/app/models/new.model';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class DeletedNewsHTTPService {
  constructor(private http: HttpClient) {}

  getDeletedNews(
    token: string,
    pageNumber?: number,
    search?: string,
    MainCategoryId?: string,
    SecCategoryId?: string
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: NEW[];
      message: string | null;
      errors: string[] | null;
    }>(
      `${API_URL}/News/GetDeletedNews?pageNumber=${pageNumber ?? 1}${
        search ? '&search=' + search : ''
      }${MainCategoryId ? '&MainCategoryId=' + MainCategoryId : ''}${
        SecCategoryId ? '&SecCategoryId=' + SecCategoryId : ''
      }`,
      {
        headers: httpHeaders,
      }
    );
  }
}
