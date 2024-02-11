import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePersonnelComponent } from './fiche-personnel.component';

describe('FichePersonnelComponent', () => {
  let component: FichePersonnelComponent;
  let fixture: ComponentFixture<FichePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichePersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
