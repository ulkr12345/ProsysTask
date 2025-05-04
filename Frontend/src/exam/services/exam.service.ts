import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IExamData } from '../models/IExam';
import { EXAM_URLS } from '../../core/api/urls/urls';
import { catchError, of, switchMap } from 'rxjs';
import { IResponseWithResult } from '../../core/models/IResponseWithResult';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getExamById(id: string) {
    return this.httpClient.get<IExamData>(EXAM_URLS.GET_BY_ID(id)).pipe(
      switchMap(response => of(response)),
      catchError(error => of({ ...error }))
    );
  }

  getAllExams() {
    return this.httpClient.get<IExamData[]>(EXAM_URLS.GET_All).pipe(
      catchError(error => {
        console.error('Error fetching exams', error);
        return of([]);
      })
    );
  }

  saveExam(postData: IExamData, id: string | null = null) {
    if (id) {
      return this.httpClient.put(EXAM_URLS.UPDATE(id), postData).pipe(
        switchMap(response => {
          const result = (response as IResponseWithResult<IExamData>).result ?? [];
          return of(result);
        }),
        catchError(error => of({ ...error }))
      );
    } else {
      return this.httpClient.post(EXAM_URLS.CREATE, postData).pipe(
        switchMap(response => {
          const result = (response as IResponseWithResult<IExamData>).result ?? [];
          return of(result);
        }),
        catchError(error => of({ ...error }))
      );
    }
  }

  deleteExam(id: string) {
    return this.httpClient.delete(EXAM_URLS.DELETE(id)).pipe(
      catchError(error => of({ ...error }))
    );
  }
}
