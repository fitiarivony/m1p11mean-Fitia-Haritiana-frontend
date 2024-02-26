import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepenseComponent } from './list-depense.component';

describe('ListDepenseComponent', () => {
  let component: ListDepenseComponent;
  let fixture: ComponentFixture<ListDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDepenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
