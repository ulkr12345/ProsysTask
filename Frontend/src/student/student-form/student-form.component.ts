import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {

  formSubmitted: boolean = false;
  id: string = this.activatedRoute.snapshot.paramMap.get('id')!;

  studentForm = new FormGroup({
    no: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gradeLevel: new FormControl('', [Validators.required, Validators.min(1), Validators.max(11)])
  });

  constructor(
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.studentService.getStudentById(this.id)
        .pipe(
          first(),
          tap((response) => {
            console.log('Loaded student by ID', response);
            this.studentForm.patchValue(response);
          })
        ).subscribe();
    }
  }

  onSubmit() {
    this.formSubmitted = true;

    if (!this.studentForm.valid) {
      return;
    }

    const postData: any = { ...this.studentForm.value };

    if (this.id) {
      postData.id = this.id;
      console.log('post Data for edit', postData);

      this.studentService
        .saveStudent(postData, this.id)
        .pipe(first())
        .subscribe((response) => {
          if (response?.error?.isError) {
            // this.notifyService.error();
          } else {
            // this.notifyService.success();
            this.studentForm.reset();
            this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          }
        });
    } else {
      this.studentService
        .saveStudent(postData)
        .pipe(first())
        .subscribe((response) => {
          if (response?.error?.isError) {
            // this.notifyService.error();
          } else {
            // this.notifyService.success();
            this.studentForm.reset();
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
          }
        });
    }
  }
}
