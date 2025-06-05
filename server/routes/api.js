const express = require('express');
const multer = require('multer');
const router = express.Router();

const { uploadAllFiles } = require('../tools/multer.js');
const form = require('../controllers/form.js');

router.post('/api/create',uploadAllFiles,form.create);
router.post('/api/update',uploadAllFiles,form.update);
router.post('/api/search',multer().none(),form.search);
router.post('/api/detail',multer().none(),form.detail);
router.post('/api/search/cardexpire',multer().none(),form.searchcardexpire);
router.post('/api/search/memberfee',multer().none(),form.searchmemberfee);
router.post('/api/delete',multer().none(),form.delete);

module.exports = router;