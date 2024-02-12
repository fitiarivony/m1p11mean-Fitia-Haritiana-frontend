import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPreferenceServicesComponent } from './gestion-preference-services.component';

describe('GestionPreferenceServicesComponent', () => {
  let component: GestionPreferenceServicesComponent;
  let fixture: ComponentFixture<GestionPreferenceServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPreferenceServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPreferenceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
