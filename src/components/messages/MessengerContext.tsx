import { createContext, useContext, useState, ReactNode } from "react";

interface ChatUser {
  name: string;
  avatar: string;
  online: boolean;
}

interface MessengerContextProps {
  popupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  openChats: ChatUser[];
  openChat: (user: ChatUser) => void;
  closeChat: (name: string) => void;
}

const MessengerContext = createContext<MessengerContextProps | null>(null);

export const useMessenger = () => useContext(MessengerContext)!;

export const MessengerProvider = ({ children }: { children: ReactNode }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [openChats, setOpenChats] = useState<ChatUser[]>([]);

  const openChat = (user: ChatUser) => {
    setOpenChats((prev) =>
      prev.find((u) => u.name === user.name) ? prev : [...prev, user]
    );
  };

  const closeChat = (name: string) => {
    setOpenChats((prev) => prev.filter((u) => u.name !== name));
  };

  return (
    <MessengerContext.Provider
      value={{
        popupOpen,
        openPopup: () => setPopupOpen(true),
        closePopup: () => setPopupOpen(false),
        openChats,
        openChat,
        closeChat,
      }}
    >
      {children}
    </MessengerContext.Provider>
  );
};
