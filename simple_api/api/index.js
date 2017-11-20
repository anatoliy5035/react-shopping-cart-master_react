var router = require('express').Router();
var mocks = require('./mock');
var assign = require('object-assign');

router.get('/products', function (req, res, next) {
    var products = mocks.products.map(function (article) {
            return assign({}, article, {
                text: undefined
            })
        }),
        limit = Number(req.query.limit) || products.length,
        offset = Number(req.query.offset) || 0;

    res.json(products.slice(offset, limit + offset))
});

router.get('/products/:id', function (req, res, next) {
    var product = mocks.products.filter(function (product) {
        return product.id == req.params.id
    })[0];
    if (product) return res.json(product);

    res.status(404).json({error: "not found"});
});

module.exports = router;
