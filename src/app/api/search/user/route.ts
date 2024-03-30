import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const usersList = await db.user.findMany({
        where: {
            email: {
                contains: email
            }
        }
    });

    const users = usersList.map(user => user.email);

    return NextResponse.json({
        users
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
