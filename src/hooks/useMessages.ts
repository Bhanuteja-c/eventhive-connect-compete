
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Message, Conversation } from '@/types/messages';

export const useMessages = (conversationId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    fetchConversations();
    if (conversationId) {
      fetchMessages(conversationId);
      subscribeToMessages(conversationId);
    }
  }, [user, conversationId]);

  const fetchConversations = async () => {
    try {
      const { data: participantData, error: participantError } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          conversations:conversation_id (
            id,
            created_at,
            updated_at,
            status
          ),
          profiles:user_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('user_id', user?.id);

      if (participantError) throw participantError;

      // Transform the data into our Conversation interface
      const formattedConversations: Conversation[] = participantData.map((item: any) => ({
        id: item.conversations.id,
        participant: {
          id: item.profiles.id,
          name: item.profiles.full_name || 'Unknown User',
          avatar: item.profiles.avatar_url,
          isOnline: true // We'll implement real presence later
        },
        lastMessage: {
          content: '', // We'll fetch this separately
          timestamp: item.conversations.updated_at,
          isRead: true
        },
        unreadCount: 0
      }));

      setConversations(formattedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load conversations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender:sender_id (
            id,
            profiles (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedMessages: Message[] = data.map((message: any) => ({
        id: message.id,
        content: message.content,
        timestamp: message.created_at,
        isRead: true,
        sender: {
          id: message.sender.id,
          name: message.sender.profiles?.full_name || 'Unknown User',
          avatar: message.sender.profiles?.avatar_url
        }
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive',
      });
    }
  };

  const sendMessage = async (content: string, conversationId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user?.id,
          content
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  const subscribeToMessages = (conversationId: string) => {
    const subscription = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        async (payload) => {
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', payload.new.sender_id)
            .single();

          if (userError) {
            console.error('Error fetching user data:', userError);
            return;
          }

          const newMessage: Message = {
            id: payload.new.id,
            content: payload.new.content,
            timestamp: payload.new.created_at,
            isRead: payload.new.sender_id === user?.id,
            sender: {
              id: payload.new.sender_id,
              name: userData.full_name || 'Unknown User',
              avatar: userData.avatar_url
            }
          };

          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  return {
    messages,
    conversations,
    loading,
    sendMessage
  };
};
