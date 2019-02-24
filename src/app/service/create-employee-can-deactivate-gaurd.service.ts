import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from '../employees/create-employee.component';


export class CreateEmployeeCanDeactivateGaurdService implements CanDeactivate<CreateEmployeeComponent> {
  canDeactivate(component: CreateEmployeeComponent): boolean {
    if ( component.createEmployeeForm.dirty ) {
      return confirm('Do you want to discard your changes?');
    } else {
      return true;
    }
  }
}
