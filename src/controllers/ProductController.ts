import { prisma } from "../server";
import { Request, Response } from "express";

export default {
    async getAllProducts(req: Request, response: Response) {
        const products = await prisma.product.findMany();
        return response.json(products);
    },

    async createProduct(req: Request, response: Response) {
        const { name, description, rate } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                rate
            }
        });

        return response.json(product);
    },
}