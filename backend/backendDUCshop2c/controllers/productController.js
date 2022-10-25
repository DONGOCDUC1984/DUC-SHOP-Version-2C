require("dotenv").config();
console.log("productController file: process.env.PORT: " + process.env.PORT);
var port = process.env.PORT;
const Product = require("../models/productModel");
var fs = require("fs");
const path = require("path");

async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
}

async function createproduct(req, res) {
  try {
    //console.log("req.body: ", req.body);
    //console.log("req.files: ", req.files);
    var productinfo = JSON.parse(req.body.document);
    //console.log("productinfo: ", productinfo);
    const products = await Product.find();

    var arrayproductsid = products.map((x) => {
      return x.id;
    });
    function myArrayMax(arr) {
      return Math.max.apply(null, arr);
    }
    if (products.length === 0) {
      maxID = 0;
    } else {
      maxID = myArrayMax(arrayproductsid);
    }

    //console.log("maxID: ", maxID);
    var filename =
      req.user.email + "_" + Date.now() + "_" + req.files.image.name;
    var file = req.files.image;

    var uploadpath = "./public/uploads/images/" + filename;
    file.mv(uploadpath, (err) => {
      if (err) throw err;
    });

    var newproduct = await Product.create({
      id: maxID + 1,
      name: productinfo.name,
      price: productinfo.price,
      type: productinfo.type,
      url: `http://localhost:${port}/uploads/images/${filename}`,
    });
    res.status(200).json(newproduct);
  } catch (error) {
    console.log(error);
  }
}

async function deleteproduct(req, res) {
  try {
    var product = await Product.findById(req.params._id);
    if (!product) {
      res.status(400).json("product does not exist.");
    }

    await fs.unlink(
      "./public/uploads/images/" + path.basename(product.url),
      function (err) {
        if (err) throw err;
      }
    );

    await product.remove();
    res.status(200).json({ _id: req.params._id, info: "product was deleted." });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  createproduct,
  deleteproduct,
};
