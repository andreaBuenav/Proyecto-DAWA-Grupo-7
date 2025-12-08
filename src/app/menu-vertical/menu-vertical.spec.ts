import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVertical } from './menu-vertical';

describe('MenuVertical', () => {
  let component: MenuVertical;
  let fixture: ComponentFixture<MenuVertical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuVertical]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuVertical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
