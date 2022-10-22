import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { set } from "lodash";
import { throwError } from "../helpers/ErrorHandler.helper";
import { asyncWrap } from "../middlewares/async.middleware";
import { LoginUserInput } from "../schemas/user.schema";
import { findUserByEmail } from "../services/user.service";
import { verifyPassword } from "../utils/password"
import { createAccessToken, createRefreshToken } from "../utils/token";


export const loginController = asyncWrap(
    async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = await findUserByEmail(email)
        if (!user) throwError(404, "Email is not registered")
        const isEqual = await verifyPassword(user!.password, password)
        if (!isEqual) throwError(401, "Entered password is incorrect")
        try {
            const accessToken = await createAccessToken({ id: user!.id, email: user!.email })
            const refreshToken = await createRefreshToken({ id: user!.id, email: user!.email })
            res.cookie('jwtr', refreshToken, {
                httpOnly: true,
                maxAge: 6.048e+8,
                sameSite: "strict"
            })
            res.status(201).send({ accessToken })
        } catch (error: any) {
            throwError(500, error)
        }
    })


export const logoutController = asyncWrap(
    async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
        try {
            // set(req, "headers.authorization", "");
            const authHeader: any = req.headers['authorization'];
            const pd = await sign(authHeader, "lg")
            console.log(pd)
            res.clearCookie("jwtr");
            res.status(204)
            res.end()
        } catch (error: any) {
            throwError(500, error)
        }
    })

