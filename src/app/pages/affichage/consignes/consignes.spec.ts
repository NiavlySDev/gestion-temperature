import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consignes } from './consignes';

describe('Consignes', () => {
  let component: Consignes;
  let fixture: ComponentFixture<Consignes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consignes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consignes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
