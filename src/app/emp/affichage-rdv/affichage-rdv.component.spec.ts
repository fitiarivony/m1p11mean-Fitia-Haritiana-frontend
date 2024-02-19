import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageRdvComponent } from './affichage-rdv.component';

describe('AffichageRdvComponent', () => {
  let component: AffichageRdvComponent;
  let fixture: ComponentFixture<AffichageRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageRdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
