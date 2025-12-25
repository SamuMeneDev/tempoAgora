import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBar } from './input-bar';

describe('InputBar', () => {
  let component: InputBar;
  let fixture: ComponentFixture<InputBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
