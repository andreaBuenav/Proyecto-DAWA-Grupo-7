import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaGuardia } from './consulta-guardia';

describe('ConsultaGuardia', () => {
  let component: ConsultaGuardia;
  let fixture: ComponentFixture<ConsultaGuardia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaGuardia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaGuardia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
