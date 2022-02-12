import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageShopComponent } from './message-shop.component';

describe('MessageShopComponent', () => {
  let component: MessageShopComponent;
  let fixture: ComponentFixture<MessageShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
