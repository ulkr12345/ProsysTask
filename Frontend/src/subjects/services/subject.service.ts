import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { SUBJECT_URLS } from '../../core/api/urls/urls';
import { ISubjectData } from '../models/ISubject';
import { IResponseWithResult } from '../../core/models/IResponseWithResult';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getSubjectById(id: string): Observable<any> {
    return this.httpClient
      .get<any>(SUBJECT_URLS.GET_BY_ID(id))
      .pipe(
        switchMap((response) => {
          return of(response);
        })
      );
  }

  saveSubject(postData: ISubjectData, id: string | null = null): Observable<any> {
    if (id) {
      return this.httpClient.put(SUBJECT_URLS.CREATE, postData)
        .pipe(
          switchMap((response) => {
            const results = (response as IResponseWithResult<ISubjectData>).result ?? [];
            return of(results);
          }),
          catchError((response) => {
            return of({ ...response });
          })
        );
    } else {
      return this.httpClient.post(SUBJECT_URLS.CREATE, postData)
        .pipe(
          switchMap((response) => {
            const results = (response as IResponseWithResult<ISubjectData>).result ?? [];
            return of(results);
          }),
          catchError((response) => {
            return of({ ...response });
          })
        );
    }
  }  
  
  getAllSubjects(): Observable<any[]> {
    return this.httpClient.get<any[]>(SUBJECT_URLS.GET_All).pipe(
      catchError(error => {
        console.error('Error fetching subjects', error);
        return of([]);
      })
    );
  }

  deleteSubject(id: string): Observable<any> {
    return this.httpClient.delete<any>(SUBJECT_URLS.DELETE(id)).pipe(
      catchError(response => {
        return of({ ...response });
      })
    );
  }
}
