import { ResolvedEmployeeList } from './../model/resolved-employee-list';
import { EmployeeService } from './employee.service';
import { Observable, of } from 'rxjs';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Employee } from '../model/employee.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverServie implements Resolve<Employee[] | string> {

  constructor(private _employeeService: EmployeeService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
    return this._employeeService.getEmployees()
      .pipe(catchError((err: string) => of(err)));
  }
}
