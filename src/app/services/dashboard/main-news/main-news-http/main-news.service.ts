import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/News/`;

@Injectable({
  providedIn: 'root',
})
export class MainNewsHTTPService {
  constructor(private http: HttpClient) {}

  getPublishedNews(
    token: string,
    pageNumber?: number,
    search?: string,
    categoryId?: string,
    subCategoryId?: string
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(
      `${API_URL}GetPublishedNews?pageNumber=${pageNumber ?? 1}${
        search ? '&Search=' + search : ''
      }${categoryId ? '&MainCategoryId=' + categoryId : ''}${
        subCategoryId ? '&SecCategoryId=' + subCategoryId : ''
      }`,
      {
        headers: httpHeaders,
      }
    );
  }

  deleteNew(token: string, id: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}?newsId=${id}`, {
      headers: httpHeaders,
    });
  }
}
