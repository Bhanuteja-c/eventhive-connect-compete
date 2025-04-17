
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Conversation } from '@/types/messages';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({ 
  conversations, 
  selectedConversation, 
  onSelectConversation 
}: ConversationListProps) {
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return format(date, 'h:mm a');
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  return (
    <Card className="lg:col-span-1 flex flex-col">
      <CardHeader>
        <CardTitle>Conversations</CardTitle>
        <CardDescription>
          {conversations.filter(c => c.unreadCount > 0).length} unread conversations
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(75vh-130px)]">
          <div className="px-4 pb-4 space-y-2">
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                className={`flex items-start p-3 rounded-lg transition-colors cursor-pointer hover:bg-muted ${
                  selectedConversation === conversation.id ? 'bg-muted' : ''
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="relative mr-3">
                  <Avatar>
                    <AvatarImage src={conversation.participant.avatar} />
                    <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.participant.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">{conversation.participant.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatMessageTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage.content}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
