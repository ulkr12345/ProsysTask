import { Routes } from "@angular/router";
import { SubjectListComponent } from "./subject-list/subject-list.component";
import { SubjectFormComponent } from "./subject-form/subject-form.component";

export const routes: Routes = [
    { path: '', component: SubjectListComponent },
    { path: 'create', component: SubjectFormComponent },
    { path: 'edit/:id', component: SubjectFormComponent }
  ];