import { prisma } from "../server";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { environment } from "../enviroment";


export default {
    
    async registerUser(req: Request, response: Response) {
        try {
            const { name, email, password, dateOfBirth, address} = req.body
    
            const existUser = await prisma.user.findUnique({ where: { email } });
            if (existUser) {
                return response.status(400).json({ error: 'User exists' });
            }
    
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    dateOfBirth,
                    address
                }
            })

            const payload = { name, email, dateOfBirth, address };
            const token = jwt.sign(payload, environment.jwtSecretKey, { expiresIn: '12h' });

            return response.status(201).json({ token });
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async loginUser(req: Request, response: Response) {
        try {
            const { email, password } = req.body
            const user = await prisma.user.findUnique({
                where: {
                    email,
                    password
                }
            })

            const payload = { name: user?.name, email: user?.email, dateOfBirth: user?.dateOfBirth, address: user?.address };
            const token = jwt.sign(payload, environment.jwtSecretKey, { expiresIn: '12h' });

            return response.status(201).json({ token });
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}