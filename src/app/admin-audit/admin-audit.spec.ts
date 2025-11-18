import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAudit } from './admin-audit';

describe('AdminAudit', () => {
  let component: AdminAudit;
  let fixture: ComponentFixture<AdminAudit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAudit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAudit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
