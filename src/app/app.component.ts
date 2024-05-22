import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, filter, from, map, of, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  public title = 'todo-list';
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  private zipSchoolResponses$ = zip(
    this.getStudentsDatas(),
    this.getTeachersDatas()
  );
  private ages = of(20, 30, 50, 55, 25, 17);
  private peopleDatas = from([
    { name: 'Luiz', age: 28, profession: 'Developer' },
    { name: 'Sakura', age: 18, profession: 'Student' },
    { name: 'Takezo', age: 58, profession: 'Lone Samurai' },
    { name: 'Valdir', age: 35, profession: 'Mechanic' },
    { name: 'Carla', age: 22, profession: 'Barber' },
  ]);

  constructor(private schoolService: SchoolService) {}

  public ngOnInit(): void {
    // this.getSchoolDatas();
    //this.getMultipliedAges();
    this.getPeopleNames();
  }

  public getPeopleNames(): void {
    this.peopleDatas
      .pipe(
        filter((person) => person.age > 20),
        map((person) => person.name)
      )
      .subscribe({
        next: (response) => console.log(response),
      });
  }

  public getMultipliedAges(): void {
    this.ages.pipe(map((age) => age * age)).subscribe({
      next: (response) => console.log('age', response),
    });
  }

  public getSchoolDatas(): void {
    this.zipSchoolResponses$.subscribe({
      next: (response) => {
        console.log('students', response[0]);
        console.log('teachers', response[1]);
      },
    });
  }

  private getStudentsDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  private getTeachersDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }
}
