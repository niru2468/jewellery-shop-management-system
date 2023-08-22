const express = require('express');
const db = require('../db/dbConnect');
const utils = require('../utils/utils');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

router.get('/:jewellery_id', async (req, res) => {
    const statement =
        `select j.jewellery_id,j.jewellery_name, jd.jewellery_description, jd.jewellery_price, jd.jewellery_image, j.stock_qty
         from jewellery j join jewellery_details jd
         where j.jewellery_id = jd.jewellery_id AND j.jewellery_id = ?`;
    const { jewellery_id } = req.params;
    await db.query(statement, [jewellery_id], (err, result) => {
        res.send(utils.createResult(err, result));
    });
});
router.get('/', async (req, res) => {
    const statement =
        `select j.jewellery_id,j.jewellery_name, jd.jewellery_description, jd.jewellery_price, jd.jewellery_image, j.stock_qty
         from jewellery j join jewellery_details jd
         where j.jewellery_id = jd.jewellery_id`;
    await db.query(statement, (err, result) => {
        res.send(utils.createResult(err, result));
    });
});
router.post('/add', upload.single('image'), async (req, res) => {
    const statement1 =
        `insert into jewellery(category_id, jewellery_name, isAvailable, is_offer_available, offer_id, stock_qty)
            values(?,?,?,?,?,?)`;
    const statement2 =
        `insert into jewellery_details(jewellery_id,jewellery_description, jewellery_image, jewellery_price)
        values (?,?,?,?)`;
    const { category_id, jewellery_name, isAvailable, is_offer_available, offer_id, stock_qty } = req.body;
    const { jewellery_description, jewellery_image, jewellery_price } = req.body;
    const filename = req.file.filename;
    await db.query(statement1, [category_id, jewellery_name, isAvailable, is_offer_available, offer_id, stock_qty], (err, result) => {
        db.query(statement2, [result.insertId, jewellery_description, filename, jewellery_price], (err, result) => {
            res.send(utils.createResult(err, result));
        });
    });
});
router.put('/update/:jewellery_id', async (req, res) => {
    const statement =
        `update jewellery j, jewellery_details jd set j.jewellery_name=?,
          j.isAvailable=?, j.is_offer_available=?, j.stock_qty=?, jd.jewellery_description=?,
          jd.jewellery_price=? where j.jewellery_id = jd.jewellery_id and jd.jewellery_id = ?`;
    const { jewellery_name, isAvailable, is_offer_available, stock_qty, jewellery_description, jewellery_price } = req.body;
    const { jewellery_id } = req.params;
    await db.query(statement, [jewellery_name, isAvailable, is_offer_available, stock_qty, jewellery_description, jewellery_price, jewellery_id],
        (err, result) => {
            res.send(utils.createResult(err, result));
        });
});
router.delete('/delete/:jewellery_id', (req, res) => {
    const statement = "delete from jewellery where jewellery_id = ?";
    const { jewellery_id } = req.params;
    db.query(statement, [jewellery_id], (err, result) => {
        res.send(result);
    });
});
module.exports = router;
