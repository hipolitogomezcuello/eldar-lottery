import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RafflesComponent } from './raffles.component';

describe('RafflesComponent', () => {
  let component: RafflesComponent;
  let fixture: ComponentFixture<RafflesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RafflesComponent]
    });
    fixture = TestBed.createComponent(RafflesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
