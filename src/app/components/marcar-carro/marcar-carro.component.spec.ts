import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarCarroComponent } from './marcar-carro.component';

describe('MarcarCarroComponent', () => {
  let component: MarcarCarroComponent;
  let fixture: ComponentFixture<MarcarCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcarCarroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcarCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
