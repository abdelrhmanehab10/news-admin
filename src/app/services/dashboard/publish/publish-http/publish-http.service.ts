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

  getNewsToPublish(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: NEW[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/PublishNews/GetNewsToPublish`, {
      headers: httpHeaders,
    });
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
}
