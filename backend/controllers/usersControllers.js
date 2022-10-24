const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

function sendMessageError(res, status, message) {
    res.status(200).send({
        status: status,
        message: message,
    });
}

router.post("/signup", (req, res) => {
    res.status(200).send({
        status: 200,
        message: "POST SignUp",
    });
});

router.post("/login", (req, res) => {
    res.status(200).send({
        status: 200,
        message: "POST Login",
    });
});

router.post("/login/google", (req, res) => {
    res.status(200).send({
        status: 200,
        message: "POST Login on Google",
    });
});

module.exports = router;
