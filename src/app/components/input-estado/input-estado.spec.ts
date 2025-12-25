import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEstado } from './input-estado';

describe('InputBar', () => {
  let component: InputEstado;
  let fixture: ComponentFixture<InputEstado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputEstado],
    }).compileComponents();

    fixture = TestBed.createComponent(InputEstado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
