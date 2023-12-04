import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpretPage } from './opret.page';

describe('OpretPage', () => {
  let component: OpretPage;
  let fixture: ComponentFixture<OpretPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OpretPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
