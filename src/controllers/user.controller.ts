import { NextFunction, Request, Response } from "express";
import { throwError } from "../helpers/ErrorHandler.helper";
import { asyncWrap } from "../middlewares/async.middleware";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser, findUserById } from "../services/user.service";
import { hashPassword } from "../utils/password";


export const createUserController = asyncWrap(
    async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
        const { passwordConfirmation, ...data } = req.body;
        try {
            const hashedPassword = await hashPassword(passwordConfirmation);
            data.password = hashedPassword;
            const user = await createUser(data)
            if (!user) throwError(400, "Bad request body");
            res.status(201).send(user);
        } catch (error: any) {
            if (error.code === 'P2002') {
                throwError(400, 'There is a unique constraint violation, a new user cannot be created with this email')
            }
            throwError(500, error)
        }
    }
)

export const getUserController = asyncWrap(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals.user;
        const user = await findUserById(id);
        if (!user) throwError(404, "Please Log in")
        res.send({ id: user!.id, email: user!.email, name: user!.name })
    }
)