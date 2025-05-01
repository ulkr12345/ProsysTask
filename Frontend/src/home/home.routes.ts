import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { WelcomeComponent } from "./welcome/welcome.component";

export const routes: Routes = [
    {
        path: '', component: HomeComponent,

        children: [
            { path: '', component: WelcomeComponent },
            {
                path: 'subjects',
                loadChildren: () => import('../subjects/subject.routes').then(m => m.routes)
            },
            {
                path: 'students',
                loadChildren: () => import('../student/student.routes').then(m => m.routes)
            },
            {
                path: 'exams',
                loadChildren: () => import('../exam/exam.routes').then(m => m.routes)
            },
        ]
    }
]