import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewStatusCount } from 'src/app/models/layout.model';
import { NEW } from 'src/app/models/new.model';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class PublishHTTPService {
  constructor(private http: HttpClient) {}

  getNewsToPublish(
    token: string,
    search?: string,
    categoryId?: string,
    subCategoryId?: string
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
      `${API_URL}/PublishNews/GetNewsToPublish?Search=${search ?? ''}${
        categoryId ? '&CategoryId=' + categoryId : ''
      }${subCategoryId ? '&SectionId=' + subCategoryId : ''}`,
      {
        headers: httpHeaders,
      }
    );
  }

  getRolesPassList(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: { id: string; name: string }[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/News/GetRolesPassList`, {
      headers: httpHeaders,
    });
  }

  deleteNew(token: string, ids: string[]): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();

    ids.forEach((id) => {
      formData.append(`NewsIDs`, id);
    });

    return this.http.delete<{
      status: number;
      data: NEW[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/PublishNews/DeleteNews`, {
      headers: httpHeaders,
      body: formData,
    });
  }

  publishNews(token: string, ids: string[]): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();

    ids.forEach((id) => {
      formData.append(`NewsIDs`, id);
    });

    return this.http.post<{
      status: number;
      data: NEW[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/PublishNews/PublishNews`, formData, {
      headers: httpHeaders,
    });
  }

  returnNews(
    token: string,
    newsStatus: string,
    newsIds: string[]
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();
    formData.append('NewStatus', newsStatus);
    newsIds.forEach((id) => {
      formData.append(`NewsIDs`, id);
    });

    return this.http.put<{
      status: number;
      data: NEW[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/PublishNews/ReturnNews`, formData, {
      headers: httpHeaders,
    });
  }
}
