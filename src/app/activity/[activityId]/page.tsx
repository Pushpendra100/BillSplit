"use client";
import { ActionButton } from "@/src/components";
import { Navbar } from "@/src/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

type ActivityDetailsType = {
  title: string;
  description: string;
  members: string[];
  createdAt: Date;
};

type UserDetailsType = {
  name: string;
  email: string;
  id: string;
};

type CreatorDetailsType = {
  name: string;
  email: string;
};

type ActivityInfoType = {
  money: number;
};

const ActivityPage = ({ params }: { params: { activityId: string } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activityDetails, setActivityDetails] = useState<ActivityDetailsType>();
  const [userDetails, setUserDetails] = useState<UserDetailsType>();
  const [creatorDetails, setCreatorDetails] = useState<CreatorDetailsType>();
  const [activityInfo, setActivityInfo] = useState<ActivityInfoType | null>();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const getActivityData = async () => {
    try {
      const response = await axios.get(`/api/activity/${params.activityId}`);
      if (response) {
        setActivityDetails({
          title: response.data.activity.title,
          description: response.data.activity.description,
          members: response.data.activity.members,
          createdAt: response.data.activity.createdAt,
        });
        setCreatorDetails({
          name: response.data.creator.name,
          email: response.data.creator.email,
        });
        setUserDetails({
          name: response.data.userData.name,
          email: response.data.userData.email,
          id: response.data.userData.id,
        });
        setActivityInfo({
          money: response.data.activityInfo.money,
        });
        setIsCreator(
          response.data.userData.id === response.data.activity.userId
        );
      }
      console.log(userDetails);
      console.log("done");
    } catch (error: any) {
      console.log("Failed to get data", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivityData();
  }, []);

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      setButtonLoading(true);
      const response = await axios.delete(
        `/api/activity/delete/${params.activityId}`
      );
      if (response) {
        router.push(`/dashboard/${response.data.id}`);
      }
    } catch (error: any) {
      console.log("Failed to delete", error.message);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleSettle = async () => {
    try {
      setButtonLoading(true);
      const response = await axios.patch(
        `/api/activityinfo/update/${params.activityId}`,
        { money: activityInfo!.money }
      );
      if (response) {
        setActivityInfo({ money: 0 });
        console.log("done");
      }
    } catch (error: any) {
      console.log("Failed to delete", error.message);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <main className="flex flex-col h-[100vh]">
      <Navbar />
      {loading ? (
        <div className="mt-[3rem] flex items-center justify-center">
          <p className="text-4xl">Loading...</p>
        </div>
      ) : (
        <div className=" h-[100%] flex divide-x-2 divide-gray-400">
          <section className=" h-full flex flex-col items-center pt-10">
            <h3 className="text-xl font-bold">Members</h3>
            <div className=" flex flex-col gap-3 p-5">
              <Link
                href={""}
                className="bg-gray-600 hover:bg-gray-700 py-2 px-4 w-[15vw] max-w-[15vw] text-center rounded-sm truncate"
              >
                {creatorDetails?.email}
              </Link>
              {activityDetails?.members.map((member, i) => (
                <Link
                  key={i}
                  href={""}
                  className="bg-gray-600 hover:bg-gray-700 py-2 px-4 w-[15vw] max-w-[15vw] text-center rounded-sm truncate"
                >
                  {member}
                </Link>
              ))}
            </div>
          </section>
          <section className="w-[100%] pt-10 px-5 flex flex-col ">
            <div className="flex items-start justify-between text-lg">
              <div className="w-[60%] flex flex-col gap-5">
                <h1 className="text-5xl">{activityDetails!.title}</h1>
                <p>{activityDetails!.description}</p>
              </div>
              <div className="flex flex-col gap-3 justify-end">
                <span className="text-right">
                  {activityDetails!.members.length + 1} Members
                </span>
                <span className="text-right">
                  {String(activityDetails!.createdAt).substring(0, 10)}{" "}
                  {String(activityDetails!.createdAt).substring(11, 19)}
                </span>
                <span className="text-right">
                  Creater: {creatorDetails!.name}
                </span>
              </div>
            </div>
            <div className=" my-10 h-full flex justify-center items-center text-lg">
              <div className="w-[70%] h-[80%] border-2 border-gray-600 flex flex-col gap-7 justify-center items-center ">
                {isCreator ? (
                  <>
                    <p className="w-[60%] text-center">
                      Do you want to delete this activity?
                    </p>
                    <ActionButton
                      onClick={(e) => handleDelete(e)}
                      className="bg-red-500 hover:bg-red-600 font-bold uppercase"
                      disabled={buttonLoading}
                    >
                      {buttonLoading ? "..." : "Delete"}
                    </ActionButton>
                  </>
                ) : (
                  <>
                    {activityInfo!.money ? (
                      <>
                        <p className="w-[60%] text-center">
                          You have to pay Rs {-1 * activityInfo!.money} to{" "}
                          {creatorDetails!.name}
                        </p>
                        <ActionButton
                          onClick={handleSettle}
                          className="font-bold uppercase"
                        >
                          {buttonLoading ? "..." : "Settle"}
                        </ActionButton>
                      </>
                    ) : (
                      <>
                        <p className="w-[60%] text-center">
                          You are all settled up!
                        </p>
                        <ActionButton
                          className="font-bold uppercase bg-muted hover:bg-muted"
                          disabled
                        >
                          Settled
                        </ActionButton>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default ActivityPage;
