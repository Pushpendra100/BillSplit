import { NextRequest, NextResponse } from "next/server";
import { db } from "@src/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";

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

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      user: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
