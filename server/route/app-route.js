const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Route is Up');
});

module.exports = router;