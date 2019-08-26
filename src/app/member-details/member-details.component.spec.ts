import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let member={id:null,firstName: "Syed",
  lastName: "Irfan",
  jobTitle: "Technician",
  team: "F1",
  status: "Active"};
  let createdId=null;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        {
          provide: ActivatedRoute,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create form with 5 controls', () => {
    expect(component.memberForm.contains('firstName')).toBe(true);
    expect(component.memberForm.contains('lastName')).toBe(true);
    expect(component.memberForm.contains('jobTitle')).toBe(true);
    expect(component.memberForm.contains('team')).toBe(true);
    expect(component.memberForm.contains('status')).toBe(true);
  });
  it('should make firstName control required', () => {
    let control=component.memberForm.get('firstName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should make lastName control required', () => {
    let control=component.memberForm.get('lastName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should make jobTitle control required', () => {
    let control=component.memberForm.get('jobTitle');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should make team control required', () => {
    let control=component.memberForm.get('team');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should make status control required', () => {
    let control=component.memberForm.get('status');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should create a new Member', () => {

    component.memberForm.setValue(member);
    expect(component.memberForm.status).toEqual('VALID');
    component.onSubmit();
  });

});
