
import { format } from 'date-fns';
import { Message } from '@/types/messages';

export const formatMessageTime = (timestamp: string) => {
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

export const isUserMessage = (message: Message, userId: string) => {
  return message.sender.id === userId;
};
