import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    console.log(`Hmmm...we didn't navigate anywhere`);
  }

  editMemberByID(id: number) {}

  // delete a Member useing REST DELETE method.
  deleteMemberById(id: number) {
    if (confirm('Do you want to Delete Member ?')) {
      this.appService.deleteMember(id)
        .subscribe( data => {
          this.members = this.members.filter(u => u.id !== id);
        })
       } else {
           return false;
       }

  }
}
