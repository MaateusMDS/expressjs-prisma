import { prisma } from "../server";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'

export default {
    async getAllUsers(req: Request, response: Response) {
        try {
            const users = await prisma.user.findMany();

            return response.status(200).json(users);
        } catch (error) {
            return response.status(500).json({error: 'Erro interno do servidor'})
        }
    },

    async getUserById(req: Request, response: Response) {
      try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!user) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        return response.status(200).json(user);
      } catch (error) {
        return response.status(500).json({ error: 'Erro interno do servidor' });
      }
    },
    
    async createUser(req: Request, response: Response) {
        try {
            const { name, email, password, dateOfBirth, address} = req.body
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    dateOfBirth,
                    address
                }
            })
            return response.status(201).json(user);
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async deleteUser(req: Request, response: Response) {
        try {
            const { id } = req.params;

            const  userExists = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if (!userExists) {
                return response.status(204).json({ message: 'Usuário não existe'})
            }

            const user = await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })

            return response.status(200).json(user)
            
           
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async updateUser (req: Request, response: Response) {
        try {
            const { id } = req.params;
            const { name, email, password, dateOfBirth, address} = req.body

            const  userExists = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if (!userExists) {
                return response.status(204).json({ message: 'Usuário não existe'})
            }

            const newUser = await prisma.user.update({
                where: {
                    id: Number(id)
                }, 
                data: {
                    name,
                    email, 
                    dateOfBirth,
                    address
                }
            })

            return response.status(200).json(newUser)
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async updatePassword(req: Request, response: Response) {
        try {
            const { id } = req.params;
            const { password } = req.body;

            const hashPass = await bcrypt.hash(password, 8);

            const user = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    password: hashPass
                }
            })
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}