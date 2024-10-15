export interface IToastMessage {
	id: string;
	message: string;
	type: 'success' | 'error';
	duration?: number;
}

export interface ToastContextProps {
    messages: IToastMessage[];
    addSuccessMessage: (message: string) => void;
    addErrorMessage: (message: string) => void;
    removeMessage: (id: string) => void;
}
