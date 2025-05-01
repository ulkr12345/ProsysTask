import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService } from '../services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { ISubjectData } from '../models/ISubject';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.scss'
})
export class SubjectFormComponent implements OnInit{

  formSubmitted: boolean = false;
  id: string = this.activatedRoute.snapshot.paramMap.get('id')!;

  subjectForm = new FormGroup({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    gradeLevel: new FormControl('', Validators.required),
    teacherFirstName: new FormControl('', Validators.required),
    teacherLastName: new FormControl('', Validators.required)
  });

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    if (this.id) {
      this.subjectService.getSubjectById(this.id)
        .pipe(
          first(),
          tap((response) => {
            console.log('Loaded subject by code', response);
            this.subjectForm.patchValue(response);
          })
        ).subscribe();
    }
  }

  onSubmit() {
    this.formSubmitted = true;
  
    if (!this.subjectForm.valid) {
      return;
    }
  
    if (this.id) {
      // const subjectId = parseInt(this.id);
      let postData: any = {...this.subjectForm.value};
      postData.id = this.id
  
      console.log('post Data for edit', postData);
      
      this.subjectService
        .saveSubject(postData, this.id)
        .pipe(first())
        .subscribe((response) => {
          if (response?.error?.isError) {
            // this.notifyService.error();
          } else {
            // this.notifyService.success();
            this.subjectForm.reset();
            this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          }
        });
    } else {
      this.subjectService
        .saveSubject(this.subjectForm.value as ISubjectData)
        .pipe(first())
        .subscribe((response) => {
          if (response?.error?.isError) {
            // this.notifyService.error();
          } else {
            // this.notifyService.success();
            this.subjectForm.reset();
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          }
        });
    }
  }  

}
