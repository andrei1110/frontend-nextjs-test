import { createContext, useContext, useState, ReactNode } from 'react';
import { IToastMessage, ToastContextProps } from '@/types/toast-message';

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<IToastMessage[]>([]);

    const addMessage = (message: IToastMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);

    setTimeout(() => {
        removeMessage(message.id);
        }, 5000);
    };

    const addSuccessMessage = (message: string) => {
        addMessage({ id: Date.now().toString(), message, type: 'success' });
    };

    const addErrorMessage = (message: string) => {
        addMessage({ id: Date.now().toString(), message, type: 'error' });
    };

    const removeMessage = (id: string) => {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    };

    return (
        <ToastContext.Provider value={{ messages, addSuccessMessage, addErrorMessage, removeMessage }}>
        {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};