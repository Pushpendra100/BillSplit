import { NextRequest, NextResponse } from "next/server";
import { db } from "@src/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const schema = z.object({
        email: z.string().min(1),
        password: z.string().min(1),
    });

    const safeParseResult = schema.safeParse(reqBody);
    if (!safeParseResult.success) {
        return NextResponse.json({error:"Data is invalid",  status: 400});
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
    if(!validPassword) return NextResponse.json({ error: "Invalid Password", status: 400 });

    return NextResponse.json({
      message: "User signin successful",
      status: 200,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
