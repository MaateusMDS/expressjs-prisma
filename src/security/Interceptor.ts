import { Request, Response, NextFunction } from 'express';

export default class Interceptor {
    static validateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        const validToken = "c29sdXRpcw=="

        if (!token) {
            res.status(401).json({ message: 'Token not found' });
            return res.end();
        }

        if (token !== validToken) {
            res.status(401).json({ message: 'Invalid token' });
            return res.end();
        }

        next();
    }
}