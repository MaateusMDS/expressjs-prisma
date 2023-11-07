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
    
    async getProductById(req: Request, response: Response) {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Images: true,
                Prices: true,
                TechnicalDescription: true,
                Rating: true
            }
        });
        return response.json(product);
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
    },

    async deleteProduct(req: Request, response: Response) {
        const { id } = req.params;
        const product = await prisma.product.delete({
            where: {
                id: Number(id)
            }
        });
        return response.json(product);
    },

    async updateProduct(req: Request, response: Response) {
        const { id } = req.params;
        const { name, description, rate, images, prices, technicalDescription, rating } = req.body;
    
        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
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
    },

    async patchProduct(req: Request, response: Response) {
        const { id } = req.params;
        const updateData = req.body;
    
        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: updateData
        });
    
        return response.json(updatedProduct);
    }

}