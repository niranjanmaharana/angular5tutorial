import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/ngx-bootstrap-datepicker';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../model/employee.model';
import { Department } from '../model/department.model';
import { Education } from '../model/education.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  id: number;

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  datepickerConfig: Partial<BsDatepickerConfig>;
  showPreview = false;
  errorMessage = 'Please correct the fileds highlighted in red !';
  noerror = true;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];

  educations: Education[] = [
    { id: 1, name: 'M.Tech.' },
    { id: 2, name: 'B.Tech.' },
    { id: 3, name: 'Diploma' },
    { id: 4, name: 'Matric' }
  ];

  employee: Employee = {
    id: null,
    name: null,
    email: '',
    // alternateEmail: '',
    gender: null,
    contactPreference: null,
    isActive: true,
    department: null,
    // password: null,
    // confirmPassword: null,
    education: -1,
    dateOfBirth: new Date(),
    photoPath: null
  };

  constructor(private _employeeService: EmployeeService,
              private _router: Router, private _route: ActivatedRoute) {
    this.datepickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        maxDate: new Date(),
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY'
      }
    );
  }

  togglePhotoPreview(): void {
    this.showPreview = !this.showPreview;
  }

  save(employeeForm: NgForm): void {
    if ( employeeForm.valid ) {
      this.noerror = true;
      this.errorMessage = null;
      this._employeeService.getEmployees();
      this._employeeService.save(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          employeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this.noerror = false;
      this.errorMessage = 'Please correct the fileds highlighted in red !';
    }
  }

  private getEmployee(id: number): void {
    if (this.id && this.id !== 0) {
      this._employeeService.getEmployee(this.id)
        .subscribe((employeeList) => this.employee = employeeList);
    } else {
      this.createEmployeeForm.reset();
      this.employee = {
        id: null,
        name: null,
        email: '',
        gender: null,
        contactPreference: null,
        isActive: true,
        department: null,
        education: -1,
        dateOfBirth: new Date(),
        photoPath: null
      };
    }
  }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.getEmployee(this.id);
    });
  }
}
