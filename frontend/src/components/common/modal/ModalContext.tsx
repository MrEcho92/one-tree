import React, { createContext, useState, useContext, ReactNode } from 'react';
import Modal from './Modal';

interface ModalContextProps {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (modalContent: ReactNode) => {
    setContent(modalContent);
  };

  const closeModal = () => {
    setContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {!!content && (
        <Modal content={content} isOpen={!!content} closeModal={closeModal} />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
