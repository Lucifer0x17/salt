import { TypeOf, z } from "zod";


export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is Required"
        }),
        email: z.string({
            required_error: "Email is Required"
        }).email("Not a valid email"),
        password: z.string({
            required_error: "Password is Required"
        }).min(8, "Password is too short, min 8 charachters required"),
        passwordConfirmation: z.string({
            required_error: "Password is Required"
        })
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords does not match",
        path: ['passwordConfirmation']
    })
})


export const loginUserSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is Required"
        }).email("Invalid email or Password"),
        password: z.string({
            required_error: "Password is Required"
        }).min(8, "Invalid email or Password")
    })
})

const deserializeUserSchema = z.object({
    id: z.string({ required_error: "id is required" }),
    email: z.string({
        required_error: "Email is Required"
    }).email("Invalid email or Password")
})

export type CreateUserInput = TypeOf<typeof createUserSchema>['body']

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body']

export type DeserializeUser = TypeOf<typeof deserializeUserSchema>