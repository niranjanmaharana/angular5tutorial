import { ResolvedEmployeeList } from './../model/resolved-employee-list';
import { DepartmentService } from '../service/department.service';
import { EmployeeService } from '../service/employee.service';
import { Education } from '../model/education.model';
import { Department } from '../model/department.model';
import { Employee } from '../model/employee.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  departments: Department[];
  educations: Education[] = [
    { id: 1, name: 'M.Tech.' },
    { id: 2, name: 'B.Tech.' },
    { id: 3, name: 'Diploma' },
    { id: 4, name: 'Matric' }
  ];

  employees: Employee[];
  filteredEmployees: Employee[];
  private _searchTerm: string;
  private error: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterEmployees();
  }

  constructor(private _employeeService: EmployeeService,
              private _departmentService: DepartmentService,
              private _router: Router,
              private _route: ActivatedRoute) {
      // this.employees = this._route.snapshot.data['employeeList'];
      const resolvedData: Employee[] | string = this._route.snapshot.data['employeeList'];
      if (Array.isArray(resolvedData)) {
        this.employees = resolvedData;
      } else {
        this.error = resolvedData;
      }

      if (this._route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
      } else {
        this.filteredEmployees = this.employees;
      }
  }

  ngOnInit() {
    this.departments = this._departmentService.getDepartments();

    // access request parameters
    // console.log('has searchTerm : ' + this._route.snapshot.queryParamMap.has('searchTerm'));
    // console.log('searchTerm : ' + this._route.snapshot.queryParamMap.get('searchTerm'));
    // console.log('get all searchTerm : ' + this._route.snapshot.queryParamMap.getAll('searchTerm'));

    // To work with query parameter
    // console.log(this._route.snapshot.queryParamMap.keys);

    // To work with required/optional parameter
    // console.log(this._route.snapshot.paramMap.keys);
  }

  onEmployeeNameChangeClick() {
    // this.employees[0].name = 'Jeethu';
    // const newEmployeeArray: Employee[] = Object.assign([], this.employees);
    // newEmployeeArray[1].name = 'Niranjana';
    // this.employees = newEmployeeArray;
    this.employees[1].name = 'Niranjana';
    this.filterEmployees();
  }

  filterEmployees() {
    if (this.employees) {
      if (this._searchTerm && this._searchTerm.length > 0) {
        this.filteredEmployees = this.employees.filter(
          employee => employee.name.toLowerCase().indexOf(this._searchTerm.toLowerCase()) !== -1
        );
      } else {
        this.filteredEmployees = this.employees;
      }
    }
  }

  onResetClick() {
    this.searchTerm = '';
    this.filteredEmployees = this.employees;
  }

  onDelete(id: number) {
    const index = this.filteredEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.filteredEmployees.splice(index, 1);
    }
  }
}
