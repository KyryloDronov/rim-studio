export type TelegramUser = Readonly<{
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
}>;

export type TelegramChat = Readonly<{
  id: number;
  type?: string;
}>;

export type TelegramMessage = Readonly<{
  message_id: number;
  chat: TelegramChat;
  text?: string;
  reply_to_message?: TelegramMessage;
  from?: TelegramUser;
}>;

export type TelegramCallbackQuery = Readonly<{
  id: string;
  from?: TelegramUser;
  message?: TelegramMessage;
  data?: string;
}>;

export type TelegramUpdate = Readonly<{
  update_id?: number;
  callback_query?: TelegramCallbackQuery;
  message?: TelegramMessage;
}>;
