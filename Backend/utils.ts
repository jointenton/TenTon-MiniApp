import { Bot, session } from "grammy";
import { Context, } from "grammy";

import {
    conversations,
  createConversation,
  type Conversation,
  type ConversationFlavor,

} from "@grammyjs/conversations";
import { greetings } from ".";
import { ParseModeFlavor } from "@grammyjs/parse-mode";

const TOKEN = '6395199784:AAEOXWvCJWBTNjsBvL1AL7Wap3UVMpMua9A';
export type MyContext = ParseModeFlavor<Context> & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
export const bot = new Bot<MyContext>(TOKEN);
bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
