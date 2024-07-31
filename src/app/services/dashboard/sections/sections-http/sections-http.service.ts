import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/Section/`;

@Injectable({
  providedIn: 'root',
})
export class SectionsHTTPService {
  constructor(private http: HttpClient) {}

  addMainSection(token: string, data: { [key: string]: any }): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();

    console.log(data);

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key].toString());
      }
    }

    return this.http.post<any>(`${API_URL}AddMainSection`, formData, {
      headers: httpHeaders,
    });
  }

  getAllSections(
    token: string,
    pageNumber: number,
    category: number,
    searchQuery?: string
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${API_URL}GetAllSection?PageNumber=${pageNumber}&CatId=${category}${
        searchQuery ? '&Search=' + searchQuery : ''
      }`,
      {
        headers: httpHeaders,
      }
    );
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
