import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { ISubjectData } from '../models/ISubject';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss'
})
export class SubjectListComponent implements OnInit{

  subjectList: ISubjectData[] = [];

  constructor(
    private subjectService: SubjectService
  ){}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe(data => {
      this.subjectList = data;
    });
  }

  onDelete(id: string) {
    this.subjectService.deleteSubject(id).subscribe(response => {
      if (response?.error?.isError) {
      } else {
        this.loadSubjects(); 
      }
    });
  }
}
