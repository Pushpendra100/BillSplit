import { NextRequest } from "next/server";
import { JWTPayload, jwtVerify } from "jose";

interface UserJwtPayload extends JWTPayload {
    id: string
    name: string
    email: string
  }

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        return payload as UserJwtPayload;
    } catch (error: any) {
        throw new Error(error.message);
    }
}