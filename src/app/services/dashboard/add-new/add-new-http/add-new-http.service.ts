import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterOption, NEW } from 'src/app/models/new.model';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AddNewHTTPService {
  constructor(private http: HttpClient) {}

  getContentNews(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: NEW[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/ContentTypes/GetContentTypes`, {
      headers: httpHeaders,
    });
  }
}
