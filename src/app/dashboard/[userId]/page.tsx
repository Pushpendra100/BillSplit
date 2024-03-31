"use client";

import { ActionButton, CreateActivityModal } from "@/src/components";
import { Navbar } from "@/src/components";
import axios from "axios";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

type LinkCardDataType = {
  title: string;
  amount: number;
  membersCount: number;
  dateTime: Date;
  activityId: string;
};

type UserDetailsType = {
  name: string;
  email: string;
  totalMoney: number;
};

const DashboardPage = ({ params }: { params: { userId: string } }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [linkCardData, setLinkCardData] = useState<LinkCardDataType[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetailsType>({
    name: "",
    email: "",
    totalMoney: 0,
  });

  const getUserData = async () => {
    try {
      const response = await axios.get(`/api/users/me/${params.userId}`);
      if (response) {
        setUserDetails({
          name: response.data.user.name,
          email: response.data.user.email,
          totalMoney: response.data.user.totalMoney,
        });

        response.data.user.allActivities?.forEach((activityInfo: any) => {
          setLinkCardData((prev) => [
            ...prev,
            {
              title: activityInfo.title,
              amount: activityInfo.money,
              membersCount: activityInfo.membersCount,
              dateTime: activityInfo.createdAt,
              activityId: activityInfo.activityId,
            },
          ]);
        });
      }
      console.log(linkCardData);
      console.log("done");
    } catch (error: any) {
      console.log("Failed to get user data", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <main className="flex flex-col">
      <Navbar />
      {loading ? (
        <div className="mt-[3rem] flex items-center justify-center">
          <p className="text-4xl">Loading...</p>
        </div>
      ) : (
        <section className="p-8 h-[100%] flex flex-col">
          <div className="flex items-center justify-between my-4 ">
            <h1 className="text-5xl ">{userDetails.name}'s dashboard</h1>
            {/* <div className="cursor-pointer">
                <FaRegStar size={35} className="text-muted hover:text-white" />
                <FaStar size={35} />
              </div> */}
            <div className="cursor-pointer">
              <ActionButton
                className="font-bold uppercase text-l"
                onClick={() => setShowModal(true)}
              >
                Create
              </ActionButton>
            </div>
          </div>
          <div className="text-xl">
            <span>
              <span>
                {userDetails.totalMoney ? (
                  <span>
                    Total amount status:{" "}
                    {userDetails.totalMoney > 0 ? (
                      <span className="text-green-400">
                        {String(userDetails.totalMoney)}
                      </span>
                    ) : (
                      <span className="text-red-400">
                        {String(-1 * userDetails.totalMoney)}
                      </span>
                    )}{" "}
                  </span>
                ) : (
                  <span className="text-muted">All settled up!</span>
                )}
              </span>
            </span>
            {/* <span>You're all settled up!</span> */}
          </div>
          <div className=" border-y-2 border-gray-700  w-[50%] mx-auto mt-10 "></div>
          <div className=" h-[66vh] flex py-8 flex-col gap-4 items-center overflow-y-scroll no-scrollbar scroll-smooth ">
            {linkCardData &&
              linkCardData.map((cardData, i) => (
                <Link
                  href={`/activity/${cardData.activityId}`}
                  key={i}
                  className="w-[70%] px-6 py-5 bg-gray-600 hover:bg-gray-700 flex justify-between items-center "
                >
                  <h4>{cardData.title}</h4>
                  <div className="flex items-center divide-x-2 divide-gray-400">
                    <p className="px-5">
                      {cardData.amount == 0 ? (
                        <span>Paid by you</span>
                      ) : (
                        <span>
                          You owe Rs{" "}
                          <span className="text-red-400 ">
                            {-1 * cardData.amount}
                          </span>{" "}
                        </span>
                      )}
                    </p>
                    <span className="px-5">
                      {String(cardData.membersCount)} Members
                    </span>
                    <span className="px-5">
                      {String(cardData.dateTime).substring(0, 10)}{" "}
                      {String(cardData.dateTime).substring(11, 19)}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
          <div className=" border-y-2 border-gray-700  w-[50%] mx-auto "></div>
        </section>
      )}
      {showModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800/50"
          onClick={() => setShowModal(false)}
        ></div>
      )}
      <CreateActivityModal
        open={showModal}
        closeModal={() => setShowModal(false)}
        setLinkCardData={setLinkCardData}
        modalStatus={showModal}
        email={userDetails.email}
      />
    </main>
  );
};

export default DashboardPage;
