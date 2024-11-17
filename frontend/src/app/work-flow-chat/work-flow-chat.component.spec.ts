import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowChatComponent } from './work-flow-chat.component';

describe('WorkFlowChatComponent', () => {
  let component: WorkFlowChatComponent;
  let fixture: ComponentFixture<WorkFlowChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkFlowChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkFlowChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
