import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";



dotenv.config();

//register user
export function registerUser(req, res) {

    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 10)


    const newUser = new User(data)



    newUser.save().then(() => {

        res.json({ message: "User registered successfully" })

    }).catch((error) => {
        res.status(500).json(({ error: "User registration failed" }))
    })

}

//login user
export function loginUser(req, res) {
    const data = req.body;

    User.findOne({
        email: data.email
    }).then(
        (user) => {
            if (user == null) {
                res.status(404).json({ error: "User not found" })
            } else {
                if (user.isBlocked) {
                    res.status(403).json({ error: "User account is blocked.Please contact the admin" });
                    return;
                }

                const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

                if (isPasswordCorrect) {
                    const token = jwt.sign({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                        profilePicture: user.profilePicture,
                        phone: user.phone,

                    }, process.env.JWT_SECRET)

                    res.json({ message: "Login Successful", token: token, user: user });
                } else {
                    res.status(401).json({ error: "login failed" });
                }

            }


        }

    )
}

//check if user is admin
export function isItAdmin(req) {
    let isAdmin = false;

    if (req.user != null) {
        if (req.user.role == "admin") {
            isAdmin = true;
        }
    }
    return isAdmin;
}

//check if user is customer
export function isItCustomer(req) {
    let isCustomer = false;

    if (req.user != null) {
        if (req.user.role == "customer") {
            isCustomer = true;
        }
    }
    return isCustomer;
}


//get all users
export async function getAllUsers(req, res) {
    if (isItAdmin(req)) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.status(500).json({ error: "Failed to get users" });
        }

    } else {
        res.status(403).json({ error: "Unauthorized" });
    }

}

//block or unblock user
export async function blockOrUnblockUser(req, res) {
    const email = req.params.email;
    if (isItAdmin(req)) {
        try {
            const user = await User.findOne({
                email: email,
            });

            if (user == null) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            const isBlocked = !user.isBlocked;

            await User.updateOne(
                {
                    email: email,
                },
                {
                    isBlocked: isBlocked,
                }
            );

            res.json({ message: "User blocked/unblocked successfully" });
        } catch (e) {
            res.status(500).json({ error: "Failed to get user" });
        }
    } else {
        res.status(403).json({ error: "Unauthorized" });
    }
}

//get user
export function getUser(req, res) {
    if (req.user != null) {
        res.json(req.user);

    } else {
        res.staus(403).json({ error: "Unauthorized" });
    }
}
