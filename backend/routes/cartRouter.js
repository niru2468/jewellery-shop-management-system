const express = require('express');
const db = require('../db/dbConnect');
const utils = require('../utils/utils');
const router = express.Router();
//  select ca.cart_id, c.firstName, c.lastName, j.jewellery_name, ca.qty, sum(ca.price)
//         from customer c, cart ca, jewellery j where c.customer_id = ca.customer_id
//         and j.jewellery_id = ca.jewellery_id and c.customer_id = ?
router.get('/:customer_id', async (req, res) => {
    const { customer_id } = req.params;
    const statament = `
        select cu.customer_id, sum(ca.price) as total_price from customer cu, cart ca where cu.customer_id = ca.customer_id group by customer_id having cu.customer_id = ?;
    `;
    await db.query(statament, [customer_id], (err, result) => {
        res.send(utils.createResult(err, result));
    });
});
router.post('/add', async (req, res) => {
    const { customer_id, jewellery_id, qty } = req.body;
    const statement1 = 'select * from cart where customer_id = ? and jewellery_id = ?';
    const statement2 = `insert into cart(customer_id, jewellery_id, qty, price) values (?, ?, ?, ?)`;
    const statement3 = 'update cart set qty = ? where customer_id = ? and jewellery_id = ?';
    const statement4 = 'select jewellery_price from jewellery_details where jewellery_id = 4';
    let tempPrice;
    db.query(statement4, (err, result) => {
        //tempPrice = result.data[0].jewellery_price;
        tempPrice = qty * result[0].jewellery_price;
    });
    // if (result.data.length == 0) {
    //     db.query(statement2, [customer_id, jewellery_id, qty, (tempPrice * qty)], (err, result) => {
    //         res.send(utils.createResult(err, result));
    //     });
    // } else {
    //     const oldQty = result.data[0].qty;
    //     db.query(statement3, [oldQty + qty, customer_id, jewellery_id], (err, result) => {
    //         res.send(utils.createResult(err, result));
    //     });
    // }

    db.query(statement2, [customer_id, jewellery_id, qty, tempPrice], (err, result) => {
        res.send(utils.createResult(err, result));
    });
});
router.put('/quantity/:cart_id', (request, response) => {
    const { cart_id } = request.params;
    const { qty } = request.body;
    db.query(
        `update cart set qty = ? where cart_id = ?`,
        [qty, cart_id],
        (error, result) => {
            response.send(utils.createResult(error, result));
        }
    );
});
router.delete('/delete/:cart_id', (request, response) => {
    const { cart_id } = request.params;
    db.query(`delete from cart where cart_id = ? `, [cart_id], (error, result) => {
        response.send(utils.createResult(error, result));
    });
});


module.exports = router;
