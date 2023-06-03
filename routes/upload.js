var express = require('express');
const multer = require('multer');
const sequelize = require('../db/sequelize');
const { User, Upload } = require('../db/sequelize');
var router = express.Router();

// multer: http://expressjs.com/en/resources/middleware/multer.html
// native file storage
const upload = multer({ dest: 'uploads/' });

// in memory
const storage = multer.memoryStorage();
const uploadMemory = multer({ storage: storage })

/* POST home page. */

// return json
router.get('/', async function (req, res, next) {
    const result = await Upload.findAll();
    console.log(result);
    res.json({ status: 'OK', result });
});

// show image
router.get('/html', async function (req, res, next) {
    const result = await Upload.findAll();
    res.render('upload', { title: 'Express', uploadList: result });
});

// "HOST" image from DB, should have
router.get('/view/:id', async function (req, res, next) {
    const result = await Upload.findOne({
        id: req.path.id
    });
    console.log(result);
    res.send(result.file);
});

// "Upload" to DB
router.post('/', uploadMemory.single('file'), async function (req, res, next) {
    const result = await Upload.create({
        file: req.file.buffer
    })
    console.log(result);
    res.json({ status: 'OK', result });
});


// view all from users
router.get('/user', async function (req, res, next) {
    const result = await User.findAll();
    console.log(result);
    res.json({ status: 'OK', result });
});

// HOST image from local file system
router.get('/user/view/:id', async function (req, res, next) {
    const result = await User.findOne({
        id: req.path.id
    });
    console.log(result);
    res.sendFile(process.cwd() + "/" + result.filePicture);
});

// Upload to filesystem & save path to db
router.post('/user', upload.single('file'), async function (req, res, next) {
    console.log(req.file);
    const result = await User.create({
        filePicture: req.file.path
    });
    // res.render('index', { title: 'Express' });
    res.json({ status: 'OK', result });
});

module.exports = router;
