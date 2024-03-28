import { NextRequest, NextResponse } from "next/server";
import { db } from "@src/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const schema = z.object({
      email: z.string().min(1),
      password: z.string().min(1),
    });

    const safeParseResult = schema.safeParse(reqBody);
    if (!safeParseResult.success) {
      return NextResponse.json({ error: "Data is invalid", status: 400 });
    }

    const { email, password } = reqBody;

    console.log(reqBody);

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return NextResponse.json({ error: "User doesn't exist", status: 400 });

    const validPassword = await bcrypt.compare(password, user.password!);
    if (!validPassword)
      return NextResponse.json({ error: "Invalid Password", status: 400 });

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    const response = NextResponse.json({
      message: "Login successful",
      status: 200,
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE!) * 24 * 60 * 60 * 1000
      ),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
