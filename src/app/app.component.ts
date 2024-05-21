import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  public title = 'todo-list';
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  private zipSchoolResponses$ = zip(
    this.getStudentsDatas(),
    this.getTeachersDatas()
  );

  constructor(private schoolService: SchoolService){}

  public ngOnInit(): void {
    this.getSchoolDatas();

  }
  public getSchoolDatas(): void {
    this.zipSchoolResponses$.subscribe({
      next: (response) => {
        console.log('students', response[0]);
        console.log('teachers', response[1]);
      },
    })
  }

  private getStudentsDatas(): Observable<Array <SchoolData>>{
    return this.schoolService.getStudents();
  }

  private getTeachersDatas(): Observable<Array <SchoolData>>{
    return this.schoolService.getTeachers();
  }

}
