import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/NewsCategory/`;

@Injectable({
  providedIn: 'root',
})
export class CategoryHTTPService {
  constructor(private http: HttpClient) {}

  addCategory(token: string, data: { [key: string]: any }): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key].toString());
      }
    }

    return this.http.post<any>(`${API_URL}AddNewsCategory`, formData, {
      headers: httpHeaders,
    });
  }

  getAllCategories(
    token: string,
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${API_URL}GetNewsCategories`, {
      headers: httpHeaders,
    });
  }

  deleteSections(token: string, sectionsIds: string[]): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();

    sectionsIds.forEach((id) => formData.append('sectionIds', id));

    return this.http.delete<any>(`${API_URL}DeleteSection`, {
      headers: httpHeaders,
      body: formData,
    });
  }
}
