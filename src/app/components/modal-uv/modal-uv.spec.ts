import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUv } from './modal-uv';

describe('ModalUv', () => {
  let component: ModalUv;
  let fixture: ComponentFixture<ModalUv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUv);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
