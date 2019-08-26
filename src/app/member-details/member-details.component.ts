import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import {first} from "rxjs/operators";

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  id=null;

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
    try{  this.route.params.subscribe( params => this.id=params.id );
  }catch(e){this.id=null;}
  }

  ngOnInit() {
    this.appService.getTeams().subscribe(teams => (this.teams = teams));
    this.memberForm = this.fb.group({
      id:'',
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      jobTitle:  ['', Validators.required],
      team:  ['', Validators.required],
      status: ['Active', Validators.required]
    });
    if(this.id!=null){
      this.appService.getMembersById(this.id)
      .subscribe( data => {
        this.memberForm.setValue(data)
      });

    }
  }
  // on Save, REST PUT method called.
  ngOnChanges() {
    this.appService.updateMember(this.memberForm.value)
    .pipe(first())
    .subscribe(
      data => {
          alert(" Member "+data.firstName+" Saved.")
          this.router.navigate(['members']);
      },
      error => {
        alert("Error in Saving Member");
          this.router.navigate(['members']);

      });
  }

  // TODO: Add member to members
  onSubmit() {
    // If id is not null then we will use REST PUT Method to update the Member Info.
    if(this.id!=null) this.ngOnChanges();
    else
    // If id is null then we will use REST POST method to Save Member Info.
    this.appService.addMember(this.memberForm.value)
        .subscribe(data => {
            this.router.navigate(['members']);
        });
  }
}
