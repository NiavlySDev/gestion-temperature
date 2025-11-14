import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Temperatures } from './temperatures';

describe('Temperatures', () => {
  let component: Temperatures;
  let fixture: ComponentFixture<Temperatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Temperatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Temperatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
