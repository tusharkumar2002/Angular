import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [HttpClientModule,MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employeeList:IEmployee[]=[];
  httpService = inject(HttpService);
  router = inject(Router)
  toaster = inject(ToastrService)

  displayedColumns: string[] = ['id', 'name', 'email', 'age','phone','salary','action'];

  ngOnInit(){
    this.httpService.getAllEmployee().subscribe((result) =>{
      this.employeeList = result;
      console.log(this.employeeList);
    })
  }

  edit(id:number){
    console.log(id);
    this.router.navigateByUrl("/employee/"+id)

  }
  delete(id:number){
    this.httpService.deleteEmployee(id).subscribe(()=>{
      console.log("delete")
      this.employeeList = this.employeeList.filter(x=>x.id!=id)
      this.toaster.success("Record deleted successfully")
    })
  }

}
