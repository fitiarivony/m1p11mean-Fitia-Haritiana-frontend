import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepenseComponent } from './create-depense.component';

describe('CreateDepenseComponent', () => {
  let component: CreateDepenseComponent;
  let fixture: ComponentFixture<CreateDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDepenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
