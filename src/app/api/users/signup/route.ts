import { NextRequest, NextResponse } from "next/server";
import { db } from "@src/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const schema = z.object({
      name: z.string().min(1),
      email: z.string().min(1),
      password: z.string().min(8),
    });

    const safeParseResult = schema.safeParse(reqBody);
    if (!safeParseResult.success) {
      return NextResponse.json({ error: "Data is invalid", status: 400 });
    }

    const { name, email, password } = reqBody;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    console.log("this is the found user");
    console.log(user);

    if (user)
      return NextResponse.json({ error: "User already exists", status: 400 });

    console.log();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const tokenData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    const response = NextResponse.json({
      message: "User created successfully",
      status: 201,
      user: newUser,
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
