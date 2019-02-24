import { Employee } from '../model/employee.model';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'employeeFilter',
  pure: false
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: Employee[], searchTerm: string): Employee[] {
    if (!employees || !searchTerm) {
      return employees;
    } else {
      return employees.filter(employee =>
        employee.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1
      );
    }
  }
}
