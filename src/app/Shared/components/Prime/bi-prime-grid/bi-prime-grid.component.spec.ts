import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIPrimeGridComponent } from './bi-prime-grid.component';

describe('BIPrimeGridComponent', () => {
  let component: BIPrimeGridComponent;
  let fixture: ComponentFixture<BIPrimeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIPrimeGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BIPrimeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
