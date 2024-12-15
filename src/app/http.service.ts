import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployee } from './interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "https://localhost:7269";

  http=inject(HttpClient);

  constructor() { }

  getAllEmployee(){
    return this.http.get<IEmployee[]>(this.apiUrl+"/api/Employee")
  }
  
  createEmployee(employee: IEmployee) {
    return this.http.post(this.apiUrl + '/api/Employee', employee);
  }
  getEmployee(employeeId:number){
    return this.http.get<IEmployee[]>(this.apiUrl+"/api/Employee/"+employeeId)
  }
  updateEmployee(employeeId:number,employee:IEmployee){
    return this.http.put<IEmployee>(this.apiUrl + '/api/Employee/'+employeeId,employee)
  }

  deleteEmployee(employeeId:number){
    return this.http.delete<IEmployee>(this.apiUrl + '/api/Employee/'+employeeId)
  }
}
