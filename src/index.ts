import { PrismaClient } from "@prisma/client";
import express from "express";
import ProductController from "./controllers/ProductController";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = await prisma.todo.create({
    data: {
      completed: false,
      createdAt: new Date(),
      text: req.body.text ?? "Empty todo",
    },
  });

  return res.json(todo);
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  return res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await prisma.todo.update({
    where: { id },
    data: req.body,
  });

  return res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.todo.delete({
    where: { id },
  });

  return res.send({ status: "ok" });
});

app.get("/products", ProductController.getAllProducts);

app.post("/products", ProductController.createProduct);

app.get("/products/:id", ProductController.getProductById);

app.put("/products/:id", ProductController.updateProduct);

app.delete("/products/:id", ProductController.deleteProduct);

app.patch("/products/:id", ProductController.patchProduct);

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
