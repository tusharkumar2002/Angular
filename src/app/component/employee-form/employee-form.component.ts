import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule,  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

   formBuilder = inject(FormBuilder);
   httpService = inject(HttpService)
   router=inject(Router)
   route = inject(ActivatedRoute)
   toaster = inject(ToastrService)


  employeeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required]],  // Age is now a string
    phone: ['', []],
    salary: ['', [Validators.required]]
   });
employeeId!:number;
isEdit =false;

 

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    
    if (this.employeeId) {
      // Edit mode
      this.isEdit = true;
      this.httpService.getEmployee(this.employeeId).subscribe(result => {
        if (result && !Array.isArray(result)) {
          this.employeeForm.patchValue(result);  // Patch the form with the employee data
          
          // Disable the email form control in edit mode
          this.employeeForm.controls.email.disable();
        } else {
          console.error('Expected a single employee object but got an array or undefined.');
        }
      });
    } else {
      // Add mode
      this.isEdit = false;
      this.employeeForm.controls.email.enable();  // Ensure email is enabled in add mode
    }
  }
  



  save() {
    // Temporarily enable the email field to include it in the form submission
    this.employeeForm.controls.email.enable();
  
    const employee: IEmployee = {
      name: this.employeeForm.value.name!,
      age: this.employeeForm.value.age!,
      email: this.employeeForm.value.email!,
      phone: this.employeeForm.value.phone!,
      salary: this.employeeForm.value.salary!,
    };
  
    if (this.isEdit) {
      this.httpService.updateEmployee(this.employeeId, employee).subscribe(() => {
        console.log("Employee updated successfully");
        this.toaster.success("Record update successfully");
        this.router.navigateByUrl("/employee-list");
      });
    } else {
      this.httpService.createEmployee(employee).subscribe(() => {
        console.log("Employee created successfully");
        this.toaster.success("Record Added successfully")
        this.router.navigateByUrl("/employee-list");
      });
    }
  
    // Re-disable the email field after submission only if in edit mode
    if (this.isEdit) {
      this.employeeForm.controls.email.disable();
    }
  }
  
  
}
