import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalModulos } from './principal-modulos';

describe('PrincipalModulos', () => {
  let component: PrincipalModulos;
  let fixture: ComponentFixture<PrincipalModulos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalModulos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalModulos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
