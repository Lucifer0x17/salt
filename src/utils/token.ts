import { sign, verify } from "jsonwebtoken";
import { DeserializeUser } from "../schemas/user.schema";


export const createAccessToken = (user: DeserializeUser) => {
    return sign(user, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15s'
    })
}

export const createRefreshToken = (user: DeserializeUser) => {
    return sign(user, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d'
    })
}

export const verifyJwt = (token: string, secret: string) => {
    try {
        const decoded = verify(token, secret);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (e: any) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}

export const reIssueAccessToken = async (refreshToken: string) => {

    const { decoded }: { decoded: any } = verifyJwt(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    if (!decoded) return false;

    const { iat, exp, ...user } = decoded
    const accessToken = await createAccessToken(user)
    console.log(accessToken)

    return accessToken;
}