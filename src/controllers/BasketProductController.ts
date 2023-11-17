import { prisma } from "../server";
import { Request, Response } from "express";

export default {
    async getAllBasketProductByBasketId(req: Request, response: Response) {
        try {
            const { id } = req.params;
            const basketsProducts = await prisma.basketProduct.findMany({
                where: {
                    basketId: Number(id)
                }
            })

            return response.status(200).json(basketsProducts)
        } catch (error) {
            return response.status(500).json({error: 'Erro interno do servidor'})
        }
    },

    async createBasketProduct(req: Request, response: Response) {
        try {
            const { basketId, productId } = req.body
            const basketProduct = await prisma.basketProduct.create({
                data: {
                    basketId,
                    productId
                }
            })

            return response.status(201).json(basketProduct);
        } catch (error) {
            return response.status(500).json({ error: error });
        }
    }
}