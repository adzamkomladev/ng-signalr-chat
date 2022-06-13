import { Component, OnInit } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';
import { ChatsListComponent } from './components/chats-list/chats-list.component';

@Component({
  standalone: true,
  imports: [ChatsListComponent, ChatComponent],
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
