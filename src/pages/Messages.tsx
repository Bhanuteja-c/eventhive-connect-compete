import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';
import { ConversationList } from '@/components/messages/ConversationList';
import { MessageList } from '@/components/messages/MessageList';
import { MessageInput } from '@/components/messages/MessageInput';
import { useToast } from '@/hooks/use-toast';

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string>('');
  const { messages, conversations, loading, sendMessage } = useMessages(selectedConversation);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await sendMessage(newMessage, selectedConversation);
      setNewMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
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
        <ConversationList 
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
        
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center">
                  <div>
                    <CardTitle className="text-lg">{getSelectedConversation()?.participant.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 p-0 flex flex-col">
                <MessageList messages={messages} />
                <MessageInput 
                  value={newMessage}
                  onChange={setNewMessage}
                  onSend={handleSendMessage}
                />
              </CardContent>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <User className="h-12 w-12 mx-auto text-muted-foreground" />
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
