import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaLista } from './busca-lista';

describe('BuscaLista', () => {
  let component: BuscaLista;
  let fixture: ComponentFixture<BuscaLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
