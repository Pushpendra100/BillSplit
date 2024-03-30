import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
type Params = {
    activityId: string;
  };

export async function PATCH(request: NextRequest, context: {params: Params}) {
  try {
    const {money} = await request.json();
    const userDetails = await getDataFromToken(request);
    const activityId = context.params.activityId;
    await db.activity.findUnique({
        where: {
            id: activityId
        }
    });


    const activityInfoData = await db.activityInfo.findFirst({
        where: {
            userId: userDetails.id,
            activityId
        }
    })

    await db.activityInfo.update({
        where: {
            id: activityInfoData?.id
        },
        data: {
            money: 0
        }
    })

    const user = await db.user.update({
        where: {
            id: userDetails.id
        },
        data: {
            totalMoney:{
                increment: money
            }
        }
    })

    return NextResponse.json({
        message: "ActivityInfo updated",
      });

    return NextResponse.json({
        message: "Activity and ActivityInfo Delete",
        id: userDetails.id,
      });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
