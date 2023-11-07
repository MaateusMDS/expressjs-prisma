import { prisma } from "../server";
import { Request, Response } from "express";

export default {
    async getAllProducts(req: Request, response: Response) {
        const products = await prisma.product.findMany({
            include: {
                Images: true,
                Prices: true,
                TechnicalDescription: true,
                Rating: true
            }
        });
        return response.json(products);
    },

    async createProduct(req: Request, response: Response) {
        const { name, description, rate, images, prices, technicalDescription, rating } = req.body;
    
        const product = await prisma.product.create({
            data: {
                name,
                description,
                rate,
                Images: {
                    create: images
                },
                Prices: {
                    create: prices
                },
                TechnicalDescription: {
                    create: technicalDescription
                },
                Rating: {
                    create: rating
                }
            }
        });
    
        return response.json(product);
    }
}