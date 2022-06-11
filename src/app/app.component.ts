import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from './@core/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  messages!: string[];
  currentMessageSubscription!: Subscription;

  constructor(private readonly chatService: ChatService) {}

  ngOnInit() {
    this.form = new FormGroup({
      user: new FormControl(''),
      message: new FormControl(''),
    });
    this.messages = [];

    this.currentMessageSubscription = this.chatService
      .getCurrentMessage()
      .subscribe((message) => this.messages.push(message));
  }

  ngOnDestroy(): void {
    this.currentMessageSubscription.unsubscribe();
  }

  onSendMessage() {
    const { user, message } = this.form.value;

    this.chatService.sendMessage(user, message);
  }
}
