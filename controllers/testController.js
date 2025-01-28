const models = require('../models');

async function test(req, res) {
    // One to many - 1:m -- One customer can have many orders
    const customer = await models.Customer.findByPk(req.params.customerId, {
        include: [models.Order]  // Including associated orders
    });

    // One to many - 1:m -- One order can have many ordered items and payments
    const order = await models.Order.findByPk(req.params.orderId, {
        include: [models.OrderedItem, models.Payment]
    });

    // One to many - 1:m -- One product can have many ordered items
    const product = await models.Product.findByPk(req.params.productId, {
        include: [models.OrderedItem]
    });

    // One to many - 1:m -- One category can have many products
    const category = await models.Product.findByPk(req.params.productId, {
        include: [models.Product]
    });

    res.status(200).json({
        customerData: customer,    
        orderData: order,          
        productData: product,      
        categoryData: category     
    });
}

module.exports = {
    test: test
}