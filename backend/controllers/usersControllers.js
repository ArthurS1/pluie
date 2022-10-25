const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { UsersModel } = require("../models/usersModel");

function sendMessageError(res, status, message) {
    res.status(200).send({
        status: status,
        message: message,
    });
}

router.get("/", (req, res) => {
    UsersModel.find((err, docs) => {
        if (!err) {
            res.status(200).send({ status: 200, users: docs });
            console.log(docs);
        } else res.status(200).send({ status: 400, message: "ERROR get data DB !" });
    });
});

router.post("/signup", (req, res) => {
    var tmp = 0;
    console.log(req.query);
    if (!req.body || !req.body.username || !req.body.password || !req.body.mail) {
        sendMessageError(res, 400, "Not value information");
        return;
    }
    UsersModel.findOne({
        $or: [
            { $and: [{ mail: req.body.mail }, { google: false }] },
            { $and: [{ username: req.body.username }, { google: false }] },
        ],
    })
        .then(function (doc) {
            if (doc && doc.mail == req.body.mail)
                return res.status(200).send({ status: 401, message: "Mail already use !" });
            if (doc && doc.username == req.body.username)
                return res.status(200).send({ tatus: 402, message: "Username already use !" });
            var reg = new RegExp(
                "^[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|.|-]{1}[a-z0-9]+)*[.]{1}[a-z]{2,6}$",
                "i"
            );
            if (!reg.test(req.body.mail)) return sendMessageError(res, 404, "Mail non valid !");
            const newUser = new UsersModel({
                username: req.body.username,
                mail: req.body.mail,
                password: req.body.password,
                tokenAuth: "null",
                google: false,
            });
            newUser
                .save()
                .then(function (docs) {
                    const token = jwt.sign(
                        { userId: docs._id },
                        "Clément Guichard and Team develop (François, Arthur, Vincent, Ugo)",
                        { expiresIn: "24h" }
                    );

                    UsersModel.updateOne({ _id: docs._id }, { tokenAuth: token }).then(function (
                        suc
                    ) {
                        return res
                            .status(200)
                            .send({ status: 200, message: "User create in DB !" });
                    });
                })
                .catch(function (err) {
                    return sendMessageError(res, 405, "Error creating new User: " + err);
                });
        })
        .catch(function (errr) {
            sendMessageError(res, 403, "ERROR get DB !" + errr);
        });
});

router.post("/login", (req, res) => {
    UsersModel.findOne(
        { $or: [{ mail: req.body.mail }, { username: req.body.mail }] },
        function (err, doc) {
            if (err) return res.status(200).send({ status: 400, message: "ERROR get data DB !" });
            if (!doc || err || doc.google == true)
                return res
                    .status(200)
                    .send({ status: 401, message: "Client don't have a account !" });
            if (doc.password != req.body.password)
                return res.status(202).send({ status: 202, message: "Password no valid !" });
            if (doc.password == req.body.password)
                return res.status(200).send({
                    status: 200,
                    tokenAuth: doc.tokenAuth,
                    username: doc.username,
                    message: "Client connected !",
                });
        }
    );
});

router.post("/login/google", (req, res) => {
    UsersModel.findOne({ $and: [{ mail: req.body.mail }, { google: true }] }, function (err, doc) {
        if (err) return res.status(200).send({ status: 400, message: "ERROR get data DB !" });
        if (!doc) {
            const newUser = new UsersModel({
                username: req.body.username,
                mail: req.body.mail,
                password: "google",
                tokenAuth: req.body.tokenAuth,
                google: true,
            });
            console.log(req.body.tokenAuth);
            newUser
                .save()
                .then(function (docs) {
                    console.log(docs);
                    return res.status(200).send({
                        status: 200,
                        tokenAuth: docs.tokenAuth,
                        username: docs.username,
                        message: "Client connected with google!",
                    });
                })
                .catch(function (err) {
                    sendMessageError(res, 405, "Error creating new User: " + err);
                    return;
                });
        } else {
            UsersModel.updateOne({ _id: doc._id }, { tokenAuth: req.body.tokenAuth }).then(
                function (suc) {
                    UsersModel.findOne({ _id: doc._id }, function (err, docs) {
                        console.log(docs);
                        return res.status(200).send({
                            status: 200,
                            tokenAuth: docs.tokenAuth,
                            username: docs.username,
                            message: "Client connected with google!",
                        });
                    });
                }
            );
        }
    });
});

router.patch("/widget", (req, res) => {
    UsersModel.updateOne({ tokenAuth: req.body.tokenAuth }, { widgets: req.body.widgets })
        .then(function (suc) {
            console.log(suc);
            console.log("body =>");
            console.log(req.body);
            return res.status(200).send({ status: 200, message: "Widget update !" });
        })
        .catch(function (err) {
            return res.status(200).send({ status: 400, message: "Not possible update widget !" });
        });
});

module.exports = router;
