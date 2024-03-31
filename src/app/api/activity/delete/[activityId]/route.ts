import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
type Params = {
  activityId: string;
};

export async function DELETE(
  request: NextRequest,
  context: { params: Params }
) {
  try {
    const userDetails = await getDataFromToken(request);
    const activityId = context.params.activityId;
    await db.activity.findUnique({
      where: {
        id: activityId,
      },
    });

    const activityInfoData = await db.activityInfo.findMany({
      where: {
        activityId,
      },
    });

    activityInfoData.forEach(async (activityInfo) => {
      if (activityInfo.money != 0) {
        const user = await db.user.update({
          where: {
            id: activityInfo.userId,
          },
          data: {
            totalMoney: {
              increment: -1 * activityInfo.money,
            },
          },
        });
      }
    });

    await db.activityInfo.deleteMany({
      where: {
        activityId,
      },
    });

    return NextResponse.json({
      message: "Activity and ActivityInfo Delete",
      id: userDetails.id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
