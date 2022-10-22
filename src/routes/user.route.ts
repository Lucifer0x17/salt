import express from "express"
import { createUserController, getUserController } from "../controllers/user.controller"
import isAuthorized from "../middlewares/isAuthenticated.middleware"
import validateAsset from "../middlewares/validateAsset.middleware"
import { createUserSchema } from '../schemas/user.schema'

const router = express.Router()

router.get('/', (req, res) => {
    // res.cookie("bleh", "ayush", {
    //     httpOnly: true
    // })
    res.status(200).send("This is user route")
})

router.post('/signup', validateAsset(createUserSchema), createUserController)

router.get('/profile', isAuthorized, getUserController)


export default router