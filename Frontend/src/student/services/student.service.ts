import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { STUDENTS_URLS } from '../../core/api/urls/urls';
import { IStudentData } from '../models/IStudent';
import { IResponseWithResult } from '../../core/models/IResponseWithResult';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getStudentById(id: string): Observable<any> {
    return this.httpClient
      .get<any>(STUDENTS_URLS.GET_BY_ID(id))
      .pipe(
        switchMap((response) => {
          return of(response);
        })
      );
  }

  saveStudent(postData: IStudentData, id: string | null = null): Observable<any> {
    if (id) {
      return this.httpClient.put(STUDENTS_URLS.UPDATE(id), postData)
        .pipe(
          switchMap((response) => {
            const results = (response as IResponseWithResult<IStudentData>).result ?? [];
            return of(results);
          }),
          catchError((response) => {
            return of({ ...response });
          })
        );
    } else {
      return this.httpClient.post(STUDENTS_URLS.CREATE, postData)
        .pipe(
          switchMap((response) => {
            const results = (response as IResponseWithResult<IStudentData>).result ?? [];
            return of(results);
          }),
          catchError((response) => {
            return of({ ...response });
          })
        );
    }
  }

  getAllStudents(): Observable<any[]> {
    return this.httpClient.get<any[]>(STUDENTS_URLS.GET_All).pipe(
      catchError(error => {
        console.error('Error fetching students', error);
        return of([]);
      })
    );
  }

  deleteStudent(id: string): Observable<any> {
    return this.httpClient.delete<any>(STUDENTS_URLS.DELETE(id)).pipe(
      catchError(response => {
        return of({ ...response });
      })
    );
  }
}
