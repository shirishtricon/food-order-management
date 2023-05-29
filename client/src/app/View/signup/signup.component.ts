import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { UserService } from 'src/app/Model/Services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('addUser', { static: false }) form!: NgForm;
  userAdded: string;
  lastEmpId: number;
  lastEmpName: string;
  message: string = ''

  constructor(private userService: UserService, private fb: FormBuilder) {}

  onUserAdd(form: NgForm) {
    if (form.valid) {
      if (form.value.password === form.value.cnfPassword) {
        let user: any = {
          emp_id: form.value.emp_id,
          first_name: form.value.first_name,
          last_name: form.value.last_name,
          email: form.value.email,
          password: form.value.password,
          contact_no: form.value.contact_no
        };
        this.userService.addUser(user).subscribe(
          (data: any) => {
            this.lastEmpId = data.emp_id;
            this.lastEmpName =
              data.first_name + ' ' + (!(data.last_name) ? '' : data.last_name);
            this.userAdded = 'Done';
            if (form && form.reset instanceof Function) {
              form.reset();
            }
          },
          (err) => {
            console.log(err);
            if(err.status === 0) {
              this.message = 'Service Unavailable. Try again later'
            } else if(err.status === 409) {
              this.message = 'User Already exist'
            } else {
              this.message = 'Error';
            }
           
          }
        );
      } else {
        this.message = 'Passwords did not match';
      }
    } else {
      this.message = 'Please Enter all Details';
    }
  }
}
