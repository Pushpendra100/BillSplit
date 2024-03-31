import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  userId: string;
};

export async function GET(
  request: NextRequest,
  context: { params: Params }
) {
  try {
    const userId = context.params.userId;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        allActivities: {
            orderBy: {
                createdAt: 'desc'
            }
        }
      }
    });
    return NextResponse.json({
      message: "User found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
