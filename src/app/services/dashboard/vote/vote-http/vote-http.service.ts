import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}/Votes/`;

@Injectable({
  providedIn: 'root',
})
export class VoteHTTPService {
  constructor(private http: HttpClient) {}

  addVote(
    token: string,
    vote: {
      sectionId: string;
      pollBody: string;
      startDate: Date;
      endDate: Date;
      voteOptions: { optionBody: string }[];
    }
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${API_URL}AddVote`, vote, {
      headers: httpHeaders,
    });
  }

  getAllVotes(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${API_URL}GetAllVotes`, {
      headers: httpHeaders,
    });
  }
}
