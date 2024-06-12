import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewStatusCount } from 'src/app/models/layout.model';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class LayoutHTTPService {
  constructor(private http: HttpClient) {}

  getNewsStatusCount(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: NewStatusCount[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/News/GetNewsStatusCount`, {
      headers: httpHeaders,
    });
  }
}
