import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AddNewHTTPService {
  constructor(private http: HttpClient) {}

  getGalleries(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/Image/GetGalleries`, {
      headers: httpHeaders,
    });
  }

  getGalleryTypes(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/Image/GetGalleryTypes`, {
      headers: httpHeaders,
    });
  }

  getGalleryByType(token: string, galleryId: string = '0'): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/Image/GetGalleryByType?categoryId=${galleryId}`, {
      headers: httpHeaders,
    });
  }

  getGalleryImages(
    token: string,
    pageNumber?: number,
    galleryTypeId?: string,
    galleryId?: string,
    searchText?: string
  ): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(
      `${API_URL}/Image/GetGalleryImages?pageNumber=${pageNumber ?? '1'}${
        galleryTypeId ? `&GalleryTypeId=${galleryTypeId}` : ''
      }${galleryId ? `&GalleryId=${galleryId}` : ''}${
        searchText ? `&searchText=${searchText}` : ''
      }`,
      {
        headers: httpHeaders,
      }
    );
  }

  addImage(
    token: string,
    subCategoryId?: string,
    Caption?: string,
    CHKWaterMark?: boolean,
    ImageUrl?: string,
    Width?: number,
    Hieght?: number,
    XAccess?: number,
    YAccess?: number,
    Image?: File
  ) {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const data: { [key: string]: any } = {
      subCategoryId,
      Caption,
      CHKWaterMark,
      ImageUrl,
      Width,
      Hieght,
      XAccess,
      YAccess,
      Image,
    };

    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key].toString());
      }
    }

    return this.http.post<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/Image/AddImage`, formData, {
      headers: httpHeaders,
    });
  }

  addNew(
    token: string,
    newsAction?: number,
    sectionId?: number,
    catId?: number,
    NewsType?: number,
    Title?: string,
    SubTitle?: string,
    Story?: string,
    Brief?: string,
    Tags?: string[],
    image1Id?: number,
    image2Id?: number,
    PictureCaption1?: string,
    PicCaption2?: string,
    ByLine?: string,
    Notes?: string,
    ContentAlbumIds?: string[],
    ChkNewsTicker?: boolean,
    ChkTopNews?: boolean,
    ChkTopNewCategory?: boolean,
    ChkReadNow?: boolean,
    ChkImportantNews?: boolean,
    ChkFilesNews?: boolean,
    ChkTopNewSection?: boolean,
    ChkIsVideo?: boolean,
    ChkIsInstall?: boolean,
    ChkIsAkbhbarKhassa?: boolean,
    ChkIsImage?: boolean,
    PublishDate?: string
  ) {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const data: { [key: string]: any } = {
      newsAction,
      sectionId,
      catId,
      NewsType,
      Title,
      SubTitle,
      Story,
      Brief,
      Tags,
      image1Id,
      image2Id,
      PictureCaption1,
      PicCaption2,
      ByLine,
      Notes,
      ContentAlbumIds,
      ChkNewsTicker,
      ChkTopNews,
      ChkTopNewCategory,
      ChkReadNow,
      ChkImportantNews,
      ChkFilesNews,
      ChkTopNewSection,
      ChkIsVideo,
      ChkIsInstall,
      ChkIsAkbhbarKhassa,
      ChkIsImage,
      PublishDate,
    };

    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (Array.isArray(value)) {
          value.forEach((item: any) => formData.append(key, item));
        } else {
          formData.append(key, value.toString());
        }
      }
    }

    return this.http.post<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/News/AddNews`, formData, {
      headers: httpHeaders,
    });
  }

  addDraft(token: string, draft: { [key: string]: any }) {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const formData = new FormData();

    for (const key in draft) {
      if (draft.hasOwnProperty(key)) {
        const value = draft[key];
        if (Array.isArray(value)) {
          value.forEach((item: any) => formData.append(key, item));
        } else {
          formData.append(key, value.toString());
        }
      }
    }

    return this.http.post<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/Draft/AddDrafts`, formData, {
      headers: httpHeaders,
    });
  }

  getDrafts(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: any;
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/Draft/GetDrafts`, {
      headers: httpHeaders,
    });
  }

  restoreDraft(token: string, id: number): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: any[] | null;
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/Draft/RestoreDraft?draftId=${id}`, {
      headers: httpHeaders,
    });
  }

  deleteAllDrafts(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/Draft/DeleteAllDrafts`, {
      headers: httpHeaders,
    });
  }

  getDraftById(token: string, id: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      status: number;
      data: any[];
      message: string | null;
      errors: string[] | null;
    }>(`${API_URL}/Draft/GetDrafts?draftId=${id}`, {
      headers: httpHeaders,
    });
  }
}
