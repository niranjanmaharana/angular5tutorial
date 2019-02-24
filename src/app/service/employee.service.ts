import { catchError } from 'rxjs/operators';
import { Employee } from './../model/employee.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from './config.server';

@Injectable()
export class EmployeeService {
  private employees: Employee[] = [];

  constructor(private httpClient: HttpClient, private _configService: ConfigService) {
    debugger;
  }

  getEmployees(): Observable<Employee[]> {
    console.log(this._configService.apiUrl);
    return this.httpClient.get<Employee[]>('http://localhost:3000/employees')
      .pipe(catchError(this._configService.handleError));
  }

  getEmployee(id: number): Observable<Employee> {
    // return this.employees.find(employee => employee.id === id);
    return this.httpClient.get<Employee>('http://localhost:3000/employees/' + id)
      .pipe(catchError(this._configService.handleError));
  }

  save(employee: Employee): Observable<Employee> {
    if (employee.id === null) {
      return this.httpClient.post<Employee>('http://localhost:3000/employees', employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(catchError(this._configService.handleError));
    } else {
      // update employee
    }
  }

  delete(id: number) {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }
}
