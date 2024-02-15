import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRdvComponent } from './historique-rdv.component';

describe('HistoriqueRdvComponent', () => {
  let component: HistoriqueRdvComponent;
  let fixture: ComponentFixture<HistoriqueRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueRdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
