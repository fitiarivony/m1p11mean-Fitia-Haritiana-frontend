import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyennesComponent } from './moyennes.component';

describe('MoyennesComponent', () => {
  let component: MoyennesComponent;
  let fixture: ComponentFixture<MoyennesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyennesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoyennesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
