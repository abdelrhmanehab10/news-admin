import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NEW } from 'src/app/models/new.model';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class NewsStatusHTTPService {
  constructor(private http: HttpClient) {}

  getNews(
    token: string,
    pageNumber: number,
    searchQuery: string,
    status: string,
    mainType: string,
    subType: string
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
      `${API_URL}/News/GetNews?pageNumber=${pageNumber ?? 1}${
        searchQuery ? '&Serach=' + searchQuery : ''
      }${status ? '&Status=' + status : ''}${
        mainType ? '&MainType=' + mainType : ''
      }${subType ? '&subType=' + subType : ''}`,
      {
        headers: httpHeaders,
      }
    );
  }
}
