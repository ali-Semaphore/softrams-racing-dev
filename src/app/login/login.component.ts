import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { MembersComponent } from '../members/members.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    localStorage.setItem('username', this.loginForm.value.username);
    this.appService.setUsername(this.loginForm.value.username);
    if(this.appService.username.length>0)
    this.router.resetConfig([
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'members/new',
        component: MemberDetailsComponent
      },
      {
        path: 'members/:id',
        component: MemberDetailsComponent
      }
    ]
  );
    this.router.navigate(['members']);
  }

}
