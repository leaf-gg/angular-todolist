import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SchoolData {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private students: Array<SchoolData> = [
    { name: 'Julia', id: '1' },
    { name: 'Marcus', id: '2' },
    { name: 'Isabel', id: '3' },
  ];

  private teachers: Array<SchoolData> = [
    {
      name: 'Magda',
      id: '1',
    },
    {
      name: 'André',
      id: '2',
    },
    {
      name: 'Val',
      id: '3',
    },
  ];
  public getStudents(): Observable<Array<SchoolData>> {
    return of(this.students);
  }

  public getTeachers(): Observable<Array<SchoolData>> {
    return of(this.teachers);
  }
}


