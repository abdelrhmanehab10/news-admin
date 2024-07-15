import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { INews } from '../models/INews';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiUrl = environment.apiUrl + '/news'
  httpOptions

  constructor(private httpClient : HttpClient, private authService : AuthService) {
    this.httpOptions ={
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': "Bearer "+ authService.authLocalStorageToken
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzJlYjA5OTlmOWE1Njk3NDdjZjE3ODZhMzc4N2YzIiwidXNlck5hbWUiOiJzdXBlcmFkbWluIiwicGhvbmVOdW1iZXIiOiIxMDA2MzU0NTg4IiwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsInJvbGVzIjpbItmF2K_ZitixINin2YTZhti42KfZhSIsItmF2K_ZitixINin2YTYqti52YTZitmC2KfYqiIsItmF2K3YsdixIiwi2LHYptmK2LMg2YLYs9mFIiwiRWRpdGluZyBEaXJlY3RvciIsItin2YTYr9mK2LPZgyIsItmF2YTYqtmK2YXZitiv2YrYpyIsItmF2LHYp9is2LnYqSDZiNmG2LTYsSIsItmF2K_ZitixINin2YTYp9i52YTYp9mG2KfYqiJdLCJleHAiOjE3NDk1NTczNzEsImlzcyI6IkFwcFNlY3VlciIsImF1ZCI6IkFwcFNlY3VlclVzZXIifQ.T7qm2TLun30_6VwbOCjgLpu7zN_f1bk9iMUCSlKwwUQ"
      })
    }
   }

  public getAllNews(pageNum:number,status:number,MainType?:number,subtype?:number,Search?:string){
    return this.httpClient.get(`${this.apiUrl}/getNews?pageNumber=${pageNum}&Status=${status}&MainType=${MainType}&subType=${subtype}&Search=${Search}`,this.httpOptions).pipe();
  }
  
  public getPublishedNews(pageNum:number,MainType?:number,MainCategoryId?:number,SecCategoryId?:number,Search?:string){
    return this.httpClient.get(`${this.apiUrl}/getPublishedNews?pageNumber=${pageNum}${MainCategoryId!==undefined? `&MainCategoryId=${MainCategoryId}`:''}${SecCategoryId!==undefined?`&SecCategoryId=${SecCategoryId}`:''}${Search !==undefined ? `&Search=${Search}`:''}`,this.httpOptions).pipe();
  }
  public getDeletedNews(pageNum:number,MainType?:number,MainCategoryId?:number,SecCategoryId?:number,Search?:string){
    return this.httpClient.get(`${this.apiUrl}/getDeletedNews?pageNumber=${pageNum}${MainCategoryId!==undefined? `&MainCategoryId=${MainCategoryId}`:''}${SecCategoryId!==undefined?`&SecCategoryId=${SecCategoryId}`:''}${Search !==undefined ? `&Search=${Search}`:''}`,this.httpOptions).pipe();
  }

  public getRolesPasslist(){
    return this.httpClient.get(`${this.apiUrl}/getRolesPassList`,this.httpOptions).pipe();
  }

  //Get News By CategoryId
  public getNewsByCategory(categoryId:number){
    return this.httpClient.get(`${this.apiUrl}/NewsByCategoryId/${categoryId}`).pipe();
  }

  //Get One News
  public getSingleNews(id:string) {
    let dataURL: string = `${this.apiUrl}/${id}`;
    return this.httpClient.get(dataURL,this.httpOptions).pipe();
  }

  //Create a News
  public createNews(news :INews){
    return this.httpClient.post(this.apiUrl,news,this.httpOptions).pipe();
  }

  //Create a News
  public createNews2(news :FormData){
    return this.httpClient.post(`${this.apiUrl}/AddNews`,news,this.httpOptions).pipe();
  }


  //Update a News
  public updateNews(newsId:string,news :INews){
    let dataURL :string = `${this.apiUrl}/${newsId}`;
    return this.httpClient.put(dataURL,news,this.httpOptions).pipe();
  }

  //Delete a News
  public deleteNews(NewsId:string):Observable<{}>{
    let dataURL :string = `${this.apiUrl}/${NewsId}`;
    return this.httpClient.delete<{}>(dataURL,this.httpOptions).pipe();
  }

  
  // HandleError
  public handleError(error : HttpErrorResponse) {
    let errMsg :string = ''
    if(error.error instanceof ErrorEvent){
      //Client Error
      errMsg = `Error : ${error.error.message}`;
    }else{
      //Server error
      errMsg = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errMsg);  
  }


  public getStatusCount(){
    return this.httpClient.get(`${this.apiUrl}/GetNewsStatusCount`,this.httpOptions).pipe()
  }
}
