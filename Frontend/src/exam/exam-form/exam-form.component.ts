import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { SubjectService } from '../../subjects/services/subject.service';
import { StudentService } from '../../student/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first, tap } from 'rxjs';
import { IExamData } from '../models/IExam';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './exam-form.component.html',
  styleUrl: './exam-form.component.scss'
})
export class ExamFormComponent implements OnInit {

  formSubmitted: boolean = false;
  id: string = this.activatedRoute.snapshot.paramMap.get('id')!;
  subjectList: any[] = [];
  studentList: any[] = [];

  examForm = new FormGroup({
    subjectCode: new FormControl('', Validators.required),
    studentNo: new FormControl('', Validators.required),
    examDate: new FormControl('', Validators.required),
    score: new FormControl('', [Validators.required, Validators.min(2), Validators.max(5)])
  });

  constructor(
    private examService: ExamService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadStudents();

    if (this.id) {
      this.examService.getExamById(this.id)
        .pipe(
          first(),
          tap((response) => {
            console.log('Loaded exam by ID', response);
            this.examForm.patchValue(response);
          })
        ).subscribe();
    }
  }

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe(subjects => {
      console.log('subject list gotten', subjects);
      
      this.subjectList = subjects.map(s => ({
        ...s,
        displayLabel: `${s.code} - ${s.name}`
      }));
    });
    console.log('subject list', this.subjectList);
    
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe(students => {
      this.studentList = students.map(s => ({
        ...s,
        displayLabel: `${s.no} - ${s.firstName} ${s.lastName}`
      }));
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (!this.examForm.valid) {
      return;
    }

    if (this.id) {
      let postData: any = { ...this.examForm.value, id: this.id };

      console.log('Post data for edit', postData);

      this.examService.saveExam(postData, this.id)
        .pipe(first())
        .subscribe(response => {
          if (response?.error?.isError) {
            // error handling
          } else {
            this.examForm.reset();
            this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          }
        });
    } else {
      this.examService.saveExam(this.examForm.value as IExamData)
        .pipe(first())
        .subscribe(response => {
          if (response?.error?.isError) {
            // error handling
          } else {
            this.examForm.reset();
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          }
        });
    }
  }
}
