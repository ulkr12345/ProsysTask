import { environment } from "../../../environments/environment";

let baseUrl = environment.apiBaseUrl;

export const SUBJECT_URLS = {
    GET_All: baseUrl + '/subjects',
    CREATE: baseUrl + '/subjects',
    GET_BY_ID: (id: string) => baseUrl + '/subjects/' + id,
    UPDATE: (id: string) => baseUrl + '/subjects/' + id,
    DELETE: (id: string) => baseUrl + '/subjects/' + id,
} 

export const STUDENTS_URLS = {
    GET_All: baseUrl + '/students',
    CREATE: baseUrl + '/students',
    GET_BY_ID: (id: string) => baseUrl + '/students/' + id,
    UPDATE: (id: string) => baseUrl + '/students/' + id,
    DELETE: (id: string) => baseUrl + '/students/' + id,
}

export const EXAM_URLS = {
    GET_All: baseUrl + '/exams',
    CREATE: baseUrl + '/exams',
    GET_BY_ID: (id: string) => baseUrl + '/exams/' + id,
    UPDATE: (id: string) => baseUrl + '/exams/' + id,
    DELETE: (id: string) => baseUrl + '/exams/' + id,
}