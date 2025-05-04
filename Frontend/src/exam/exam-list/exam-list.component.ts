import { Component, OnInit } from '@angular/core';
import { IExamData } from '../models/IExam';
import { ExamService } from '../services/exam.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.scss'
})

export class ExamListComponent implements OnInit {

  examList: IExamData[] = [];

  constructor(
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.examService.getAllExams().subscribe(data => {
      this.examList = data;
    });
  }

  onDelete(id: string): void {
    this.examService.deleteExam(id).subscribe(response => {
      if (response?.error?.isError) {
        // Handle error (optional notification)
      } else {
        this.loadExams(); // Refresh list after successful delete
      }
    });
  }
}
