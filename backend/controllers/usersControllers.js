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
    if (req.query.tokenAuth) {
        UsersModel.findOne({ tokenAuth: req.query.tokenAuth }, function (err, doc) {
            if (err) return res.status(200).send({ status: 400, message: "ERROR get data DB !" });
            console.log(doc);
            if (!doc || err)
                return res.status(200).send({ status: 401, message: "User doesn't exist !" });
            return res.status(200).send({ status: 200, users: doc });
        });
    } else {
        UsersModel.find((err, docs) => {
            if (!err) {
                res.status(200).send({ status: 200, users: docs });
                console.log(docs);
            } else res.status(200).send({ status: 400, message: "ERROR get data DB !" });
        });
    }
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

            newUser
                .save()
                .then(function (docs) {
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

router.get("/widget", (req, res) => {
    UsersModel.findOne({ tokenAuth: req.query.tokenAuth })
        .then(function (suc) {
            return res.status(200).send({
                status: 200,
                tokenAuth: suc.tokenAuth,
                widgets: suc.widgets,
                message: "Widget du client !",
            });
        })
        .catch(function (err) {
            return res.status(200).send({ status: 400, message: "Not possible get widget !" });
        });
});

router.delete("/widget", (req, res) => {
    if (!req.body.tokenAuth || !req.body.id)
        return sendMessageError(res, 400, "Not value information");
    UsersModel.findOne({ tokenAuth: req.body.tokenAuth })
        .then(function (suc) {
            var newWidgets = suc.widgets.filter((obj) => obj.id !== req.body.id);

            var idExist = suc.widgets.filter((obj) => obj.id === req.body.id);

            if (idExist.length > 0) {
                UsersModel.updateOne({ tokenAuth: req.body.tokenAuth }, { widgets: newWidgets })
                    .then(function (suc) {
                        return res.status(200).send({
                            status: 200,
                            message: "Widget deleted !",
                            widgets: newWidgets,
                        });
                    })
                    .catch(function (err) {
                        return res
                            .status(200)
                            .send({ status: 400, message: "Not possible update widget !" });
                    });
            } else
                return res
                    .status(200)
                    .send({ status: 400, message: "The ID Widgets doesn't exist !" });
        })
        .catch(function (err) {
            return res.status(200).send({ status: 400, message: "The User Token doesn't exist !" });
        });
});

router.patch("/widget", (req, res) => {
    var widgets;
    if (!req.body.id || !req.body.tokenAuth || !req.body.widget)
        return sendMessageError(res, 400, "Not value information");

    UsersModel.findOne({ tokenAuth: req.body.tokenAuth })
        .then(function (suc) {
            widgets = suc.widgets;
            for (let i = 0; i < widgets.length; i++) {
                if (widgets[i].id === req.body.id) {
                    if (req.body.widget.name) widgets[i].name = req.body.widget.name;
                    if (req.body.widget.description)
                        widgets[i].description = req.body.widget.description;
                    if (req.body.widget.params) {
                        if (req.body.widget.params.city)
                            widgets[i].params.city = req.body.widget.params.city;
                        if (req.body.widget.params.days)
                            widgets[i].params.days = req.body.widget.params.days;
                    }
                }
            }

            UsersModel.updateOne({ tokenAuth: req.body.tokenAuth }, { widgets: widgets })
                .then(function (suc) {
                    return res
                        .status(200)
                        .send({ status: 200, message: "Widget update !", widgets: widgets });
                })
                .catch(function (err) {
                    return res
                        .status(200)
                        .send({ status: 400, message: "Not possible update widget !" });
                });
        })
        .catch(function (err) {
            return res.status(200).send({ status: 400, message: "The User Token doesn't exist !" });
        });
});

router.post("/widget", (req, res) => {
    var widgets;
    if (!req.body.widget || !req.body.tokenAuth)
        return sendMessageError(res, 400, "Not value information");

    UsersModel.findOne({ tokenAuth: req.body.tokenAuth })
        .then(function (suc) {
            widgets = suc.widgets;
            var index = 0;
            if (widgets.length > 0) {
                index = widgets[widgets.length - 1].id;
            }
            if (
                req.body.widget.name &&
                req.body.widget.description &&
                req.body.widget.params &&
                req.body.widget.params.city &&
                req.body.widget.params.days
            ) {
                widgets.push({
                    id: index + 1,
                    name: req.body.widget.name,
                    description: req.body.widget.description,
                    params: {
                        city: req.body.widget.params.city,
                        days: req.body.widget.params.days,
                    },
                });
                UsersModel.updateOne({ tokenAuth: req.body.tokenAuth }, { widgets: widgets })
                    .then(function (suc) {
                        return res
                            .status(200)
                            .send({ status: 200, message: "Widget update !", widgets: widgets });
                    })
                    .catch(function (err) {
                        return res
                            .status(200)
                            .send({ status: 400, message: "Not possible update widget !" });
                    });
            } else
                return res.status(200).send({ status: 400, message: "Not possible get widget !" });
        })
        .catch(function (err) {
            return res.status(200).send({ status: 400, message: "Not possible get widget !" });
        });
});

module.exports = router;
