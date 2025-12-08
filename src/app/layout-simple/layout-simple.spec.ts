import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSimple } from './layout-simple';

describe('LayoutSimple', () => {
  let component: LayoutSimple;
  let fixture: ComponentFixture<LayoutSimple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSimple]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSimple);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
