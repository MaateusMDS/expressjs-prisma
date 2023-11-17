import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import ProductController from "./controllers/ProductController";
import cors from 'cors'
import UserController from "./controllers/UserController";
import BasketController from "./controllers/BasketController";
import Interceptor from './security/Interceptor';
import AuthController from "./controllers/AuthController";
import BasketProductController from "./controllers/BasketProductController";
import EmailController from "./controllers/EmailController";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
// app.use(Interceptor.validateToken);

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

//ROTAS DOS PRODUTOS
app.get("/products", ProductController.getAllProducts);
app.post("/products", ProductController.createProduct);
app.get("/products/:id", ProductController.getProductById);
app.put("/products/:id", ProductController.updateProduct);
app.delete("/products/:id", ProductController.deleteProduct);
app.patch("/products/:id", ProductController.patchProduct);

//ROTAS DO USUÁRIO
app.get("/users", UserController.getAllUsers);
app.post("/users", UserController.createUser);
app.get("/users/:id", UserController.getUserById);
app.put("/users/:id", UserController.updateUser);
app.delete("/users/:id", UserController.deleteUser);

//ROTAS DO BASKET
app.get("/basket/:id", BasketController.getBasketByUserId);
app.post("/basket", BasketController.createBasket);

//ROTAS DO BASKETPRODUCT
app.get("/basketProduct/:id", BasketProductController.getAllBasketProductByBasketId);
app.post("/basketProduct", BasketProductController.createBasketProduct);

app.post("/login", AuthController.loginUser);
app.post("/register", EmailController.createAccount);

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});