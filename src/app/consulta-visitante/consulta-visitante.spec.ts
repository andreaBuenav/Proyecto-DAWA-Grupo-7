import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVisitante } from './consulta-visitante';

describe('ConsultaVisitante', () => {
  let component: ConsultaVisitante;
  let fixture: ComponentFixture<ConsultaVisitante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaVisitante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaVisitante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
