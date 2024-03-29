import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const schema = z.object({
      userId: z.string(),
      title: z.string().min(1),
      description: z.string().min(1),
      amount: z.number(),
      members: z.string().array().nonempty()
    });

    const safeParseResult = schema.safeParse(reqBody);
    if (!safeParseResult.success) {
      return NextResponse.json({ error: "Data is invalid", status: 400 });
    }

    const {userId, title, description, amount, members} = reqBody;
    console.log(reqBody)

    const activity = await db.activity.create({
        data: {
            title, description, userId, members
        }
    });
    // make activity info for all the members here
    const activityInfo = await db.activityInfo.create({
      data: {
        title: title,
        membersCount: members.length +1,
        money: 0,
        userId,
        createdAt: activity.createdAt,
        activityId: activity.id
      }
    })

    members.forEach(async(email: string) => {
      const otherUser = await db.user.findUnique({
        where: {
          email
        }
      });
      await db.activityInfo.create({
        data: {
          title,
          activityId: activity.id,
          createdAt: activity.createdAt,
          money: -amount/(members.length+1),
          membersCount: members.length + 1,
          userId: otherUser!.id,
        }
      })
      await db.user.update({
        where: {
          id: otherUser?.id
        },
        data: {
          totalMoney: (otherUser?.totalMoney! - (amount/(members.length+1)))
        }
      })
    });

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
      message: "Activity Created",
      user,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
