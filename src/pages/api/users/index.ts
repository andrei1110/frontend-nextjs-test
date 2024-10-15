/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';
import { IUser } from '@/types/user.d';

const users: IUser[] = [
  { id: 1, name: 'Andrei Toledo', email: 'andrei.toledo@teste.com.br'},
  { id: 2, name: 'Maria Silva', email: 'maria.silva@teste.com.br'},
  { id: 3, name: 'João Ferreira', email: 'joão.ferreira@teste.com.br'},
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return res.status(200).json(users);
  }

  return res.status(405).json({ error: 'Método não permitido, use GET' });
};