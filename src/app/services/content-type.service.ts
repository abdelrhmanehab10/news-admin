import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {
  contentTypeApi = environment.apiUrl + "/ContentTypes/"
  httpOptions
  constructor(private http : HttpClient, private authService : AuthService) {
    this.httpOptions ={
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': "Bearer "+ authService.authLocalStorageToken
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzJlYjA5OTlmOWE1Njk3NDdjZjE3ODZhMzc4N2YzIiwidXNlck5hbWUiOiJzdXBlcmFkbWluIiwicGhvbmVOdW1iZXIiOiIxMDA2MzU0NTg4IiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGVzIjpbItmF2K_ZitixINin2YTZhti42KfZhSIsItmF2K_ZitixINin2YTYqti52YTZitmC2KfYqiIsItmF2K3YsdixIiwi2LHYptmK2LMg2YLYs9mFIiwiRWRpdGluZyBEaXJlY3RvciIsItin2YTYr9mK2LPZgyIsItmF2YTYqtmK2YXZitiv2YrYpyIsItmF2LHYp9is2LnYqSDZiNmG2LTYsSIsItmF2K_ZitixINin2YTYp9i52YTYp9mG2KfYqiJdLCJleHAiOjE3NDk1NTczNzEsImlzcyI6IkFwcFNlY3VlciIsImF1ZCI6IkFwcFNlY3VlclVzZXIifQ.T7qm2TLun30_6VwbOCjgLpu7zN_f1bk9iMUCSlKwwUQ"
      })
    }
  }

  getContentTypes(){
    return this.http.get(`${this.contentTypeApi}GetContentTypes`,this.httpOptions).pipe()
  }
}
