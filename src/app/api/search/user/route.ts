import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    console.log(email);
    const usersList = await db.user.findMany({
      where: {
        email: {
          startsWith: email,
        },
      },
    });

    const users = usersList.map((user) => user.email);
    console.log(usersList);

    return NextResponse.json({
      users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
