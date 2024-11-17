import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkFlowChatComponent } from './work-flow-chat/work-flow-chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkFlowChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'workflowchat';
}
