import { Component, OnInit } from '@angular/core';
import { IStudentData } from '../models/IStudent';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {

  studentList: IStudentData[] = [];

  constructor(
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe(data => {
      this.studentList = data;
    });
  }

  onDelete(id: string) {
    this.studentService.deleteStudent(id).subscribe(response => {
      if (response?.error?.isError) {
        // handle error if needed
      } else {
        this.loadStudents(); // refresh after delete
      }
    });
  }
}
