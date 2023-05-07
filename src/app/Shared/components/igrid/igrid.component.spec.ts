import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IGridComponent } from './igrid.component';

describe('IGridComponent', () => {
  let component: IGridComponent;
  let fixture: ComponentFixture<IGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
