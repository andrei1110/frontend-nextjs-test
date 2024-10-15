/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/styles/formulario.module.css';
import { IUserCreate } from '@/types/user';

export default function Form() {
	const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserCreate>();
	const [apiError, setApiError] = useState<string | null>(null);
	const [apiSuccess, setApiSuccess] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (formData: IUserCreate) => {
		setIsSubmitting(true);
    	setApiError(null);

		try {
			const response = await fetch('/api/users/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Erro ao criar usuário');
			}

			const { id } = await response.json();
			reset();
			setApiSuccess('Usuário registrado com sucesso. ID: ' + id);
		} catch (e: any) {
			setApiError(e.message);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						placeholder="Name"
						{...register('name', { required: 'O nome é obrigatório' })}
					/>

					{errors.name && <p className={styles.error}>{errors.name.message}</p>}

					<input
						type="email"
						placeholder="E-mail"
						{...register('email', {
							required: 'O e-mail é obrigatório',
							pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: 'Digite um e-mail válido',
							},
						})}
					/>

            		{errors.email && <p className={styles.error}>{errors.email.message}</p>}

					{apiError && <p className={styles.error}>{apiError}</p>}
					{apiSuccess && <p className={styles.success}>{apiSuccess}</p>}

					<button type="submit" data-type="confirm" disabled={isSubmitting}>
						{isSubmitting ? 'Enviando...' : 'Enviar'}
					</button>
				</form>
			</div>
		</div>
	);
}
