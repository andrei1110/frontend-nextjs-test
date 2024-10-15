import { IToastMessage } from '@/types/toast-message.d';

import styles from './style.module.css';

type ToastMessageProps = {
	content: IToastMessage;
	handleClose: (id: string) => void
};

export const ToastMessage: React.FC<ToastMessageProps> = ({ content: data, handleClose }) => {
	return (
		<div className={styles.container} data-toast-type={data.type} data-toast-id={data.id}>
			<span data-content>{data.message}</span>

			<span data-close onClick={() => handleClose(data.id) }>╳</span>
		</div>
	);
};
