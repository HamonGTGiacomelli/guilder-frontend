import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from "firebase/database";

const app = initializeApp({
  apiKey: "AIzaSyDVI60eiunZLDyB1fsLYEN_h2Nhm3NK97g",
  authDomain: "guilder-dbbaa.firebaseapp.com",
  databaseURL: "https://guilder-dbbaa-default-rtdb.firebaseio.com",
  projectId: "guilder-dbbaa",
  storageBucket: "guilder-dbbaa.appspot.com",
  messagingSenderId: "1071523084747",
  appId: "1:1071523084747:web:aa8a3635391a088c9e5e4e",
});

const db = getDatabase(app);

type Message = {
  senderId?: string | null;
  senderName?: string | null;
  message: string;
};

export const listenToChat = (
  chatId: string,
  onChatChange: (object: any) => void
) => {
  return onValue(ref(db, `chats/${chatId}`), (snapshot) => {
    const data = snapshot.val();
    onChatChange(data);
  });
};

export const addMessage = (chatId: string, message: Message) => {
  push(ref(db, `chats/${chatId}`), message);
};
