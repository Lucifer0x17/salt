import express from "express"
import { loginController, logoutController } from "../controllers/auth.controller"
import validateAsset from "../middlewares/validateAsset.middleware"
import { loginUserSchema } from "../schemas/user.schema"

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send(req.cookies)
})

router.post('/login', validateAsset(loginUserSchema), loginController)

router.delete('/logout', logoutController)


export default router