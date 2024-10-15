/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from 'react';

import styles from '@/styles/modal.module.css';
import { Modal } from '@/components/Modal';

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function handleModalConfirm() {
		setModalIsOpen(false);
	}

	function handleModalClose() {
		setModalIsOpen(false);
	}

	function renderModalContent(confirmText: string) {
		return (
			<div data-modal-content>
				{confirmText}
			</div>
		);
	}

	return (
		<>
			<main className={styles.container}>
				<button type="button" onClick={() => setModalIsOpen(true)}>
					Abrir modal de confirmação
				</button>
			</main>

			<Modal
				isOpen={modalIsOpen}
				title="Confirmação"
				onClose={handleModalClose}
				onConfirm={handleModalConfirm}
				footer={{ confirmText: 'Ok' }}
			>
				{renderModalContent('Teste de confirmação')}
			</Modal>
		</>
	);
}
