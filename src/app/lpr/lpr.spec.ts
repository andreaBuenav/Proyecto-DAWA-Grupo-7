import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lpr } from './lpr';

describe('Lpr', () => {
  let component: Lpr;
  let fixture: ComponentFixture<Lpr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lpr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lpr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
