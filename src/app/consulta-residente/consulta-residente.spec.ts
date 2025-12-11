import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaResidente } from './consulta-residente';

describe('ConsultaResidente', () => {
  let component: ConsultaResidente;
  let fixture: ComponentFixture<ConsultaResidente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaResidente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaResidente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
