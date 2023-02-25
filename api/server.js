const express = reqyire("express");
const mw = require("./middleware");
const userModel = require("./user-model");

const server = express();


server.use(mw.logger);
server.get("/api/kullanicilar", (req, res, next) => {
    let allUsers = userModel.getAllUser();
    res.json(allUsers);
});
server.use(express.json());

server.post("/api/kayitol", mw.validateInput, mw.validateNewUser, async (req, res, next) => {
    try {
        let user = req.user;
        let createdUser = await userModel.createUser(user).then(createUser => {
            res.status(201).json(createUser);
        }).catch(next);


    } catch (error) {
        next(error);
    }

});
server.post("/api/login", mw.validateInput, mw.validateLoginUser, (req, res, next) => {
    try {
        res.json({ message: "Hoşgeldin,giriş başarılı" })
    } catch (error) {
        next(error);
    }
});
server.use((err, res, req) => {
    res.status(err.status || 500).json({
        customMessage: "Bir hata oluştu",
        message: err.message
    });
})

module.exports = server;