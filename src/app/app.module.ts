import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailsGaurdService } from './service/employee-details-gaurd.service';
import { EmployeeListResolverServie } from './service/employee-list-resolver.service';
import { CreateEmployeeCanDeactivateGaurdService } from './service/create-employee-can-deactivate-gaurd.service';
import { EmployeeService } from './service/employee.service';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './service/config.server';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirmequal-validator.directive';
import { DepartmentService } from './service/department.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './filter/employee-filter.pipe';
import { PageNotFoundComponent } from './page-not-found.component';
import { AccordionComponentComponent } from './shared/accordion-component.component';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: {employeeList: EmployeeListResolverServie}
  },
  { path: 'employees', component: ListEmployeesComponent },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [EmployeeDetailsGaurdService]
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGaurdService]
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notFound', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // RouterModule.forRoot(appRoutes, { enableTracing: true }),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    ConfigService,
    EmployeeService,
    DepartmentService,
    CreateEmployeeCanDeactivateGaurdService,
    EmployeeListResolverServie,
    EmployeeDetailsGaurdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
