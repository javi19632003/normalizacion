import { Router } from "express";
import { Products } from "../clases/products.js";
const router = new Router();
const data = new Products("products");
import { faker }  from '@faker-js/faker';

router.get("/", async (req, res) => {
  try {
    const all = await data.getAllProducts();
    res.render("index", { all });
  } catch (err) {
    console.log(err);
  }
});

router.post("/products", async (req, res) => {
  try {
    const newProds = await data.createProduct(req.body);
    res.redirect("/").render(newProds);
    return newProds;
  } catch (err) {
    console.log(err);
  }
});

router.get("/test", (req, res) => {
  
  const datos = [];
  for (let i = 1; i < 6; i++) {
    const dato = {
      id: i,
      title: faker.commerce.productName(),
      price: faker.commerce.price(100, 2000, 2),
      thumbails: faker.image.technics(),
    };
    console.log(dato)
    datos.push(dato);
  }
  res.status(200).json({ datos });
});

export { router };
