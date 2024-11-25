const passport = require("passport");
const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const genUID = require("./generateUID")
const { checkvalidation } = require("./checkValid");

exports.allUser = async (req, res) => {
    try {
        const users = await userSchema.find();
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const name = req.body.name;
        const username = req.body.username;
        const password = await bcrypt.hash(req.body.password, 10);
        const userType = "user";
        const phone = req.body.phone;
        const uniqueId = genUID();;
        const check = checkvalidation(req.body);
        if (check.status == 400) {
            return res.status(202).json({ msg: check.message });
        }


        let usernameC = await userSchema.findOne({ username: username })

        if (!usernameC) {
            const user = new userSchema({
                name: name,
                username: username,
                password: password,
                userType: userType,
                phone: phone,
                uniqueId: uniqueId
            });
            await user.save();
            return res.status(200).json({ msg: "User Added SuccessFully" });

        } else if (usernameC) {
            return res.status(202).json({ msg: " User Already Exist" });
        }
    }
    catch (error) {
        throw error;
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, username, uniqueId, phone, address } = req.body;
        console.log(req.body.name);
        console.log(req.body.username);
        console.log(req.body.phone);
        console.log(req.body.address);

        const user = await userSchema.findOne({ uniqueId });

        if (!user) {
            return res.status(202).json({ msg: "User not found" });
        }

        user.name = name;
        user.username = username;
        user.phone = phone;
        user.address = address;

        await user.save();

        return res.status(200).json({ msg: "User information updated successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
};



exports.loginUser = (req, res, next) => {
    console.log(req.body);
    passport.authenticate("local", (err, user, info) => {
        if (err) res.send({ status: "500", message: "Try Again Later" });
        else if (!user) return res.send({ status: "202", message: "wrong cred" });
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send({ status: "200", message: "Autheticated " });
            });
        }
    })(req, res, next);
};


exports.userDetails = (req, res) => {
    res.send(req.user);
    console.log(req.user);
};
exports.logout = (req, res, nect) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        else {
            res.status(200).json({ msg: "Logged Out" })
        }
    });
};
exports.userDetail = async (req, res) => {
    const uniqueId = req.params.id;

    try {
        const user = await userSchema.findOne({ uniqueId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};