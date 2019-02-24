import { EmployeeService } from './employee.service';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeDetailsGaurdService implements CanActivate {
  constructor(private _employeeService: EmployeeService,
    private _router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const empExists = !!this._employeeService.getEmployee(+route.paramMap.get('id'));
    if (empExists) {
      return true;
    } else {
      this._router.navigate(['/notFound']);
      return false;
    }
  }
}
