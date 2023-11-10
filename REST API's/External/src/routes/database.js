const express = require('express');
const router = express.Router();

router.get("/access", (req, res) => {
    res.send("Database access");
});

router.get("/query", (req, res) => {
    res.send("Database query");
});

module.exports = router;