/**
 * Context Api
 *
 * - Criar um contexto para exibir mensagens de sucesso e erro
 * - Criar um componente para exibir as mensagens
 * - Criar um hook para disparar e consumir as mensagens
 * - Disparar as mensagens a partir dos botões abaixo
 */

import styles from '@/styles/context-api.module.css';
import { ToastMessage } from '@/components/ToastMessage';
import { ToastProvider, useToast } from '@/context/ToastContext';

export default function ContextApi() {
	const { messages, addSuccessMessage, addErrorMessage, removeMessage } = useToast();

	function handleSuccessButtonClick() {
		addSuccessMessage('Mensagem de sucesso');
	}
	
	function handleErrorButtonClick() {
		addErrorMessage('Mensagem de erro');
	}

	return (
		<ToastProvider>
			<div className={styles.container}>
				<button type="button" onClick={handleSuccessButtonClick}>
					Disparar mensagem de sucesso
				</button>
				<button type="button" onClick={handleErrorButtonClick}>
					Disparar mensagem de erro
				</button>
			</div>

			<div className={styles['toast-container']}>
				{messages.map((message) => (
					<ToastMessage key={message.id} content={message} handleClose={removeMessage} />
				))}
			</div>
		</ToastProvider>
	);
}
