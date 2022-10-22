import userRoutes from './user.route'
import authRoutes from './auth.route'
import express from "express"
import deserializeUser from "../middlewares/deserializeUser.middleware"

const router = express.Router()

router.use(deserializeUser)

router.get('/', (_, res) => res.status(200).send("Healthy"));


router.use('/user', userRoutes)

router.use('/auth', authRoutes)

export default router