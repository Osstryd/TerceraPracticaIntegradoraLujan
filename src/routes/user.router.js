import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import passport from "passport";

const controller = new UserController()

const router = Router();

//register
router.post('/register', passport.authenticate('register'), controller.register);

//login
router.post('/login', passport.authenticate('login'), controller.login);

//google
router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', {
    failureRedirect: '/errorRegister',
    successRedirect: '/profile',
    passReqToCallback: true
}));

//github
router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/profile-github", passport.authenticate("github", {
    failureRedirect: '/errorRegister',
    successRedirect: '/profile',
    passReqToCallback: true
}));

//jwt
router.get('/current', passport.authenticate('current'), (req, res) => res.send(req.user));

//dto

router.get('/dto/:id', controller.getByIdDTO)

//logout
// router.get("/logout", controller.logout);


export default router;


