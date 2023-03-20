import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Model/Services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('addUser') form = NgForm;
  userAdded: string;
  lastEmpId: number;
  lastEmpName: string

  constructor(private userService: UserService) { }

  onUserAdd(form:any) {
    if(form.valid) {
      if(form.value.password === form.value.cnfPassword) {
        console.log(form);
        
        let user: any = {
          emp_id: form.value.emp_id,
          first_name: form.value.first_name,
          last_name: form.value.last_name,
          email: form.value.email,
          password: form.value.password,
          contact_no: form.value.contact_no
        }
        this.userService.addItems(user).subscribe((data:any) => {
          this.lastEmpId = data.emp_id;
          this.lastEmpName = data.first_name +' '+ (!(data.last_name) ? '' : data.last_name)
          this.userAdded = 'Done'
        }, (err => {
          this.userAdded = 'Error'
        }));
        form.reset()
        
      } else {
        this.userAdded = 'Error'
      }
    } else {
      this.userAdded = 'Empty'
    }
  }
}
