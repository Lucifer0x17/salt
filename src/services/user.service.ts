import prisma from "../db/prismaConnect"


export const createUser = async (data: { name: string, email: string, password: string }) => {
    return await prisma.user.create({
        data
    })
}

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email
        }
    })
}

export const findUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}