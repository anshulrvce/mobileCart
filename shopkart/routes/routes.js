var express= require ('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');

router.get('/api/products', function(req, res) {
  Product.find(function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(data);
  });
});

router.post('/api/products', function(req, res) {
    var newProduct = new Product(req.body);
    newProduct.save(function(err){
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.send(newProduct);
    });
});

router.get('/api/product', function(req, res){
  var product_id = req.query.product_id;
  Product.findOne({id:product_id},function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    
        res.json(data);
  });
});


router.get('/api/cart', function(req, res){
  Cart.find(function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(data);
  });
});

router.post('/api/cart', function(req, res) {
  var product_id = req.body.product_id;
   Cart.findOne({id:product_id},function(err, cart) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if(cart!=null){
      cart['quantity']+=1;
      cart.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Cart updated!' });
    });
    }
    else{
      Product.findOne({id:product_id},function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    product= data;
    addedProduct = null;
        addedProduct = {
          id: product.id,
          name: product.name,
          capacity: product.capacity,
          price: product.price,
          image: product.image,
          quantity:1
        }
   
    
     var cart = new Cart(addedProduct);
       cart.save(function(err) {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          res.json(cart);
        });   
  });
 }
});
 });

router.delete('/api/cart', function(req, res) {
  var product_id = req.body.product_id;
  Cart.remove({id:product_id},function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
      res.send(data);
  });
});
module.exports= router;