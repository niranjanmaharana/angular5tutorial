import { DepartmentService } from '../service/department.service';
import { Education } from '../model/education.model';
import { Department } from '../model/department.model';
import { Employee } from '../model/employee.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  public employee: Employee;
  departments: Department[];
  educations: Education[] = [
    { id: 1, name: 'M.Tech.' },
    { id: 2, name: 'B.Tech.' },
    { id: 3, name: 'Diploma' },
    { id: 4, name: 'Matric' }
  ];
  public endOfList: boolean;
  private _id: number;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _employeeService: EmployeeService,
              private _departmentService: DepartmentService) { }

  ngOnInit() {
    this.departments = this._departmentService.getDepartments();
    this._route.paramMap.subscribe(param => {
      this._id = +param.get('id');
      this._employeeService.getEmployee(this._id)
        .subscribe((employeeList) => this.employee = employeeList);
    });
  }

  onNextEmployeeClick() {
    const _employee = this._employeeService.getEmployee(this._id + 1);
    if (_employee) {
      this._id += 1;
      this._router.navigate(['/employees', this._id], {
        queryParamsHandling: 'preserve'
      });
    } else {
      this.endOfList = true;
      return;
    }
  }
}
