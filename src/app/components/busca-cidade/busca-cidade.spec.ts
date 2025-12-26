import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaCidade } from './busca-cidade';

describe('BuscaCidade', () => {
  let component: BuscaCidade;
  let fixture: ComponentFixture<BuscaCidade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaCidade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaCidade);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
