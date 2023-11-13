import { prisma } from "../server";
import { Request, Response } from "express";

export default {
    async getBasketByUserId(req: Request, response: Response)  {
        try {
            const { id } = req.params;
            const basket = await prisma.basket.findMany({
                where: {
                    userId: Number(id)
                }
            })

            if (basket.length === 0) {
                return response.status(200).json({ error: 'Usuário não possui compras!'})
            }

            return response.status(200).json(basket)
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async getBasketById(req: Request, response: Response) {
        try {
            const { id } = req.params;
            const basket = await prisma.basket.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!basket) {
                return response.status(404).json({ error: 'Usuário não possui compras!'})
            }

            return response.status(200).json(basket)
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async createBasket(req: Request, response: Response) {
        try {
            const { createdAt, userId} = req.body;
            const basket = await prisma.basket.create({
                data: {
                    createdAt,
                    userId
                }
            })

            return response.status(201).json(basket)
        } catch (error) {
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }


}