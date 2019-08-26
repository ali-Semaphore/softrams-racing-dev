import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';
describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return All Members Data', () => {
  component.appService.getMembers().subscribe(data=>
    expect(data.length).toBeGreaterThan(0)
  )
})
});
