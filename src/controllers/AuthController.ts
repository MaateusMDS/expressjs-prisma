import { prisma } from "../server";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { environment } from "../enviroment";


export default {
    
    async registerUser(req: Request, response: Response) {
        try {
            const { name, email, password, dateOfBirth, address} = req.body
    
            const existUser = await prisma.user.findUnique({ where: { email } });
            if (existUser) {
                return response.status(400).json({ error: 'User exists' });
            }
    
            const hashPass = await bcrypt.hash(password, 8);
    
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPass,
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
    
            const user = await prisma.user.findUnique({ where: { email } });
    
            if (!user) {
                return response.status(401).json({ error: 'Email not found' });
            }
    
            const validPassword = await bcrypt.compare(password, user.password);
    
            if (!validPassword) {
                return response.status(401).json({ error: 'Incorrect password' });
            }
    
            const payload = {
                user: {
                    id: user.id, name: user.name, email: user.email, dateOfBirth: user.dateOfBirth, address: user.address }};
            const token = jwt.sign(payload, environment.jwtSecretKey, { expiresIn: '12h' });
    
            return response.status(201).json({ token });
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}