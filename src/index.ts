import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import ProductController from "./controllers/ProductController";
import UserController from "./controllers/UserController";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.split(" ")[1] === "123456") {
      next();
  } else {
      res.status(401).send("Unauthorized");
      res.end();
  }
});

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

app.get("/", async (req, res) => {
  res.send(
    `
  <pre>
  GET, POST /products
  GET, PUT, PATCH, DELETE /products/:id
  </pre>
  `.trim(),
  );
});

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});