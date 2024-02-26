import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepenseComponent } from './update-depense.component';

describe('UpdateDepenseComponent', () => {
  let component: UpdateDepenseComponent;
  let fixture: ComponentFixture<UpdateDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDepenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
