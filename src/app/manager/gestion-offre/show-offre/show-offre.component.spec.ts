import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOffreComponent } from './show-offre.component';

describe('ShowOffreComponent', () => {
  let component: ShowOffreComponent;
  let fixture: ComponentFixture<ShowOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
