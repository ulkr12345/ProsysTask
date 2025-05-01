import { Routes } from '@angular/router';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamFormComponent } from './exam-form/exam-form.component';

export const routes: Routes = [
  { path: '', component: ExamListComponent },
  { path: 'create', component: ExamFormComponent },
  { path: 'edit/:id', component: ExamFormComponent }
];