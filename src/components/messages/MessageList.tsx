
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/messages';
import { formatMessageTime, isUserMessage } from '@/utils/messageFormatting';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4 h-[calc(75vh-230px)]">
      <div className="space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${isUserMessage(message, 'me') ? 'justify-end' : 'justify-start'}`}
          >
            {!isUserMessage(message, 'me') && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src={message.sender.avatar} />
                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div className="space-y-1 max-w-[80%]">
              <div 
                className={`p-3 rounded-xl ${
                  isUserMessage(message, 'me')
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-muted rounded-tl-none'
                }`}
              >
                {message.content}
              </div>
              <p className="text-xs text-muted-foreground px-2">
                {formatMessageTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
