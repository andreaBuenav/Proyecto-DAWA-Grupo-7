import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gestionresidentes } from './gestionresidentes';

describe('Gestionresidentes', () => {
  let component: Gestionresidentes;
  let fixture: ComponentFixture<Gestionresidentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gestionresidentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gestionresidentes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
