
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Send, User, Users } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
  };
  unreadCount: number;
}

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: {
        id: 'user1',
        name: 'John Doe',
        avatar: undefined,
        isOnline: true,
      },
      lastMessage: {
        content: 'Looking forward to the event!',
        timestamp: new Date(2025, 3, 15, 14, 30).toISOString(),
        isRead: false,
      },
      unreadCount: 2,
    },
    {
      id: '2',
      participant: {
        id: 'user2',
        name: 'Jane Smith',
        avatar: undefined,
        isOnline: false,
      },
      lastMessage: {
        content: 'Thanks for the invitation',
        timestamp: new Date(2025, 3, 14, 9, 45).toISOString(),
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      id: '3',
      participant: {
        id: 'user3',
        name: 'Alice Brown',
        avatar: undefined,
        isOnline: true,
      },
      lastMessage: {
        content: 'Will there be parking available?',
        timestamp: new Date(2025, 3, 13, 18, 20).toISOString(),
        isRead: true,
      },
      unreadCount: 0,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: { id: 'user1', name: 'John Doe' },
      content: 'Hi there! I just registered for the Tech Conference.',
      timestamp: new Date(2025, 3, 15, 12, 30).toISOString(),
      isRead: true,
    },
    {
      id: 'm2',
      sender: { id: 'me', name: 'Me' },
      content: 'Hello John! Thanks for registering. Is there anything specific you\'re looking forward to?',
      timestamp: new Date(2025, 3, 15, 13, 45).toISOString(),
      isRead: true,
    },
    {
      id: 'm3',
      sender: { id: 'user1', name: 'John Doe' },
      content: 'Yes, I\'m really excited about the AI workshops. Looking forward to the event!',
      timestamp: new Date(2025, 3, 15, 14, 30).toISOString(),
      isRead: false,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const timestamp = new Date().toISOString();
    
    // Add message to current conversation
    setMessages(prev => [
      ...prev,
      {
        id: `m${Date.now()}`,
        sender: { id: 'me', name: 'Me' },
        content: newMessage,
        timestamp,
        isRead: true,
      }
    ]);

    // Update the conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: {
                content: newMessage,
                timestamp,
                isRead: true,
              }
            }
          : conv
      )
    );

    setNewMessage('');
  };

  const selectConversation = (id: string) => {
    setSelectedConversation(id);
    
    // Mark all messages in this conversation as read
    setMessages(prev => 
      prev.map(msg => 
        msg.sender.id !== 'me' && !msg.isRead
          ? { ...msg, isRead: true }
          : msg
      )
    );

    // Clear unread count
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

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

  const getSelectedConversation = () => {
    return conversations.find(conv => conv.id === selectedConversation);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>
      <p className="text-muted-foreground">Communicate with event participants and organizers</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh]">
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
                    onClick={() => selectConversation(conversation.id)}
                  >
                    <div className="relative mr-3">
                      <Avatar>
                        <AvatarImage src={conversation.participant.avatar} />
                        <AvatarFallback>
                          {conversation.participant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.participant.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
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
        
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={getSelectedConversation()?.participant.avatar} />
                    <AvatarFallback>
                      {getSelectedConversation()?.participant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{getSelectedConversation()?.participant.name}</CardTitle>
                    <CardDescription>
                      {getSelectedConversation()?.participant.isOnline ? 'Online' : 'Offline'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4 h-[calc(75vh-230px)]">
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender.id === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender.id !== 'me' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="space-y-1 max-w-[80%]">
                          <div 
                            className={`p-3 rounded-xl ${
                              message.sender.id === 'me' 
                                ? 'bg-primary text-primary-foreground rounded-tr-none' 
                                : 'bg-muted rounded-tl-none'
                            }`}
                          >
                            {message.content}
                          </div>
                          <p className="text-xs text-muted-foreground px-2">
                            {format(new Date(message.timestamp), 'h:mm a')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      size="icon" 
                      onClick={handleSendMessage} 
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
                <p className="text-muted-foreground mt-2">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
