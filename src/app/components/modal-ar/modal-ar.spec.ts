import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAr } from './modal-ar';

describe('ModalAr', () => {
  let component: ModalAr;
  let fixture: ComponentFixture<ModalAr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAr);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
