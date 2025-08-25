import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsPageComponent } from './restaurants-page.component';

describe('RestaurantsPageComponent', () => {
  let component: RestaurantsPageComponent;
  let fixture: ComponentFixture<RestaurantsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantsPageComponent]
    });
    fixture = TestBed.createComponent(RestaurantsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
