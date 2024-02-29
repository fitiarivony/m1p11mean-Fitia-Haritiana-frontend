import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviRdvComponent } from './suivi-rdv.component';

describe('SuiviRdvComponent', () => {
  let component: SuiviRdvComponent;
  let fixture: ComponentFixture<SuiviRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviRdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
