import { Department } from '../model/department.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DepartmentService {
  private departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 2, name: 'IT' },
    { id: 2, name: 'Payroll' }
  ];

  getDepartments(): Department[] {
    return this.departments;
  }
}
