import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDesignationsComponent } from './list-designations.component';

describe('ListDesignationsComponent', () => {
  let component: ListDesignationsComponent;
  let fixture: ComponentFixture<ListDesignationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDesignationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDesignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
