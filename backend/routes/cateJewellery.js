const express = require('express');
const db = require('../db/dbConnect');
const utils = require('../utils/utils');
const router = express.Router();

router.get('/', (req, res) => {
    const statement =
        ` select c.category_name,j.jewellery_name,j.stock_qty,
            jd.jewellery_description,jd.jewellery_price,jd.jewellery_image
            from category c join jewellery j join jewellery_details jd where
            c.category_id = j.category_id and j.jewellery_id = jd.jewellery_id;
        `;
    db.query(statement, (err, result) => {
        res.send(utils.createResult(err, result));
    });
});

module.exports = router;
