import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/UrgentNews/`;

@Injectable({
  providedIn: 'root',
})
export class UrgentNewsHTTPService {
  constructor(private http: HttpClient) {}

  getUrgentNews(token: string, pageNumber: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${API_URL}GetUrgentNews?pageNumber=${pageNumber ?? '1'}`,
      {
        headers: httpHeaders,
      }
    );
  }

  addUrgentContent(
    token: string,
    urgentContent: { Title: string; isUrgentNew: boolean }
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${API_URL}AddUrgentContent`, urgentContent, {
      headers: httpHeaders,
    });
  }

  toggleEnableUrgentNew(token: string, urgentNewId: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();
    formData.append('EditorId', urgentNewId);

    return this.http.put<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}DisbleOrEnableUrgentNew`, formData, {
      headers: httpHeaders,
    });
  }
}
