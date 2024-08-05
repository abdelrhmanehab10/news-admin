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

  getUrgentNews(token: string, pageNumber?: string): Observable<any> {
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

  addUrgentContent(token: string, ids: string[]): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${API_URL}AddUrgentContent`, ids, {
      headers: httpHeaders,
    });
  }

  toggleEnableUrgentNew(token: string, urgentNewId: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(
      `${API_URL}EnableOrDisableNew?Id=${urgentNewId}`,
      {},
      {
        headers: httpHeaders,
      }
    );
  }

  deleteUrgentContent(token: string, urgentNewId: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}DeleteUrgentContent?Id=${urgentNewId}`, {
      headers: httpHeaders,
    });
  }

  getDailyNewsContent(
    token: string,
    search?: string,
    categoryId?: string,
    subCategoryId?: string
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${API_URL}GetDailyNewsContent?Search=${search ?? ''}${
        categoryId ? '&CategoryId' + categoryId : ''
      }${subCategoryId ? '&SectionId' + subCategoryId : ''}`,
      {
        headers: httpHeaders,
      }
    );
  }
}
