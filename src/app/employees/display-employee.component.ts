import { Employee } from '../model/employee.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {
  public _lastId = 0;
  @Input()
  employee: Employee;
  @Input()
  searchTerm: string;
  @Output()
  notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  panelExpanded = false;

  constructor(private _route: ActivatedRoute, private _router: Router,
              private _employeeService: EmployeeService) {
  }

  ngOnInit() {
    this._route.paramMap.subscribe(param => {
      this._lastId = +param.get('id');
    });
  }

  onViewEmployeeClick() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: {'searchTerm': this.searchTerm}
    });
  }

  onEditEmployeeClick() {
    this._router.navigate(['/edit/', this.employee.id], {
      queryParams: {'searchTerm': this.searchTerm}
    });
  }

  onDeleteEmployeeClick() {
    this._employeeService.delete(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }
}
