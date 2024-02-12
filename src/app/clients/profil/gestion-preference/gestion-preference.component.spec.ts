import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPreferenceComponent } from './gestion-preference.component';

describe('GestionPreferenceComponent', () => {
  let component: GestionPreferenceComponent;
  let fixture: ComponentFixture<GestionPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPreferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
