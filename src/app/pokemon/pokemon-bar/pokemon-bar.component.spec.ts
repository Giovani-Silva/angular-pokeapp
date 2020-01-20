import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBarComponent } from './pokemon-bar.component';

describe('PokemonBarComponent', () => {
  let component: PokemonBarComponent;
  let fixture: ComponentFixture<PokemonBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
