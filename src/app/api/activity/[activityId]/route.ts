import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  activityId: string;
};

export async function GET(request: NextRequest, context: { params: Params }) {
  
  try {
    const userDetails = await getDataFromToken(request);
    const activityId = context.params.activityId;
  
    const activity = await db.activity.findUnique({
      where: {
        id: activityId
      }
    })
  
    const activityInfo = await db.activityInfo.findFirst({
      where: {
        activityId,
        userId: userDetails.id
      }
    })

    return NextResponse.json({
      message: "Activity found",
      activity,
      activityInfo,
      userData: {
        creator: (userDetails.id === activity?.userId),
        name: userDetails.name,
        email: userDetails.email,
      }
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
