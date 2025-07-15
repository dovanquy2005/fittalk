// components/messenges/MessengerLayout.tsx
import { MessengerPopup }  from "./MessengerPopup";
import { MessageWindow } from "./MessageWindow";
import { useMessenger } from "./MessengerContext";

export const MessengerLayout = () => {
  const { popupOpen, openChats, closeChat } = useMessenger();

  return (
    <>
      {popupOpen && <MessengerPopup />}

      {openChats.map((chat, index) => (
        <MessageWindow
          key={chat.name}
          chat={chat}
          onClose={() => closeChat(chat.name)}
          positionRight={20 + index * 340} // spacing giống Messenger
        />
      ))}
    </>
  );
};
