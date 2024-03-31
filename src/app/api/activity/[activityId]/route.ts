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

    const creator = await db.user.findUnique({
      where: {
        id: activity?.userId
      }
    })

    console.log(activity)
    console.log("userdetails", userDetails)

    return NextResponse.json({
      message: "Activity found",
      activity,
      activityInfo,
      creator,
      userData: {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
      }
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
