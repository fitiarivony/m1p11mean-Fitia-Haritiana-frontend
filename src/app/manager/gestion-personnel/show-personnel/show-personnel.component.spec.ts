import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPersonnelComponent } from './show-personnel.component';

describe('ShowPersonnelComponent', () => {
  let component: ShowPersonnelComponent;
  let fixture: ComponentFixture<ShowPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
