"use client";
import React, { ComponentProps, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ActionButton } from ".";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { RxCross1 } from "react-icons/rx";

type LinkCardDataType = {
  title: string;
  amount: number;
  membersCount: number;
  dateTime: Date;
  activityId: string;
};

type ActivityType = {
  title: string;
  description: string;
  amount: string;
  members: string[];
};

type CreateActivityModalType = ComponentProps<"dialog"> & {
  closeModal: () => void;
  setLinkCardData: (
    value:
      | LinkCardDataType[]
      | ((prevVar: LinkCardDataType[]) => LinkCardDataType[])
  ) => void;
  modalStatus: boolean;
  email: string;
};

export const CreateActivityModal = ({
  closeModal,
  setLinkCardData,
  modalStatus,
  email,
  ...props
}: CreateActivityModalType) => {
  const params = useParams();
  const [activity, setActivity] = useState<ActivityType>({
    title: "",
    description: "",
    amount: "",
    members: [],
  });

  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState<string[]>([]);

  useEffect(() => {
    setSearchEmail("");
    setActivity({
      title: "",
      description: "",
      amount: "",
      members: [],
    });
  }, [modalStatus]);

  useEffect(() => {
    setSearchResult([]);
  }, [searchEmail]);

  const handleCreateActivity = async () => {
    try {
      setLoading(true);

      if (!activity.title) {
        toast.error("Please enter title");
        return;
      }
      if (!activity.description) {
        toast.error("Please enter description");
        return;
      }
      if (!activity.amount) {
        toast.error("Please enter amount");
        return;
      }
      if (!activity.members.length) {
        toast.error("Please select atleast one member");
        return;
      }
      console.log(activity);
      const response = await axios.post("/api/activity/create", {
        ...activity,
        amount: parseInt(activity.amount),
        userId: params.userId,
      });

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      console.log("Activity success", response.data);

      //response.data.allActivities
      if (response) {
        const userAllActivities = response.data.user.allActivities.map(
          (activityInfo: any) => ({
            title: activityInfo.title,
            amount: activityInfo.money,
            membersCount: activityInfo.membersCount,
            dateTime: activityInfo.createdAt,
            activityId: activityInfo.activityId,
          })
        );
        setLinkCardData(userAllActivities);
      }

      toast.success("Activity created");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      closeModal();
      setActivity({
        title: "",
        description: "",
        amount: "",
        members: [],
      });
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchEmail) {
        toast.error("Please enter email");
        return;
      }
      const response = await axios.post("/api/search/user", {
        email: searchEmail,
      });

      if (response) {
        if (response.data.users?.includes(email)) {
          const list = response.data.users;
          const i = list.indexOf(email);
          list.splice(i, 1);
          setSearchResult(list);
          if (list.length == 0) {
            toast.error("No user found");
            setSearchEmail("");
          }
        } else {
          setSearchResult(response.data.users);
          if (response.data.users.length == 0) {
            toast.error("No user found");
            setSearchEmail("");
          }
        }
      }
      console.log(response);
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    }
  };

  const handleAddUserEmail = (i: number) => {
    if (activity.members?.includes(searchResult[i])) {
      toast.error("User is already included");
    } else {
      activity.members.push(searchResult[i]);
    }
    setSearchResult([]);
  };

  const handleRemoveUserEmail = (i: number) => {
    setActivity((prev) => {
      const updatedMembers = prev.members.filter((_, index) => index != i);
      return { ...prev, members: updatedMembers };
    });
  };

  const handleSearchClose = () => {
    setSearchEmail("");
    setSearchResult([]);
  };

  return (
    <dialog
      {...props}
      className=" w-[40vw] max-w-[50rem] max-h-[50rem] p-8 rounded-md fixed top-[50%] tranform translate-y-[-50%]"
    >
      <h2 className="text-4xl font-bold">
        {loading ? "Loading..." : "Create Activity"}
      </h2>
      <div className="bg-pink-500 mt-6 relative">
        <input
          className="px-5 py-4  w-[100%] sm0:py-3  placeholder:text-zinc-500 text-black bg-zinc-200 focus:bg-zinc-300  focus:outline-none "
          type="search"
          placeholder="Add user"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        {searchResult.length == 0 ? (
          <button
            onClick={handleSearch}
            className="text-white absolute end-0 bottom-0 top-0 bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium w-[15%] px-5 py-1"
          >
            Search
          </button>
        ) : (
          <button
            onClick={handleSearchClose}
            className="text-white absolute end-0 bottom-0 top-0 bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium w-[15%]  px-5 py-1 flex items-center justify-center "
          >
            <RxCross1 size={25} />
          </button>
        )}
        {searchResult &&
          searchResult.map((result, i) => (
            <div
              key={i}
              onClick={() => handleAddUserEmail(i)}
              className="w-[100%] absolute bg-gray-200 p-2 mt-2 rounded md flex flex-col gap-1 "
            >
              <div className="px-6 py-4 text-center bg-gray-300 hover:bg-gray-400 cursor-pointer">
                {result}
              </div>
            </div>
          ))}
      </div>
      {activity.members.length != 0 && (
        <div className="w-[100%] mt-5 mb-5 px-5 py-2 border border-gray-200 rounded-md shadow-inner flex flex-wrap gap-4">
          {activity.members.map((member, i) => (
            <div key={i} className=" flex w-fit rounded-sm bg-zinc-200">
              <p className="max-w-[14rem] truncate p-2">{member}</p>
              <span
                onClick={() => handleRemoveUserEmail(i)}
                className="bg-zinc-300 hover:bg-zinc-400 p-2 cursor-pointer flex items-center "
              >
                <RxCross2 size={20} />
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="w-[100%] py-[1rem] flex flex-col gap-5 ">
        <input
          type="text"
          placeholder="Title"
          className="h-full w-full border-b border-gray-300 bg-transparent pt-4 pb-1.5 placeholder:text-gray-500 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          value={activity.title}
          onChange={(e) => setActivity({ ...activity, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="h-full w-full border-b border-gray-300 bg-transparent pt-4 pb-1.5 placeholder:text-gray-500 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          value={activity.description}
          onChange={(e) =>
            setActivity({ ...activity, description: e.target.value })
          }
        />
        <input
          type="text"
          pattern="[0-9]*"
          placeholder="Enter amount"
          className="h-full w-[30%] border-b border-gray-300 bg-transparent pt-4 pb-1.5 placeholder:text-gray-500 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          value={activity.amount}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setActivity({ ...activity, amount: e.target.value });
            }
          }}
        />
      </div>
      <div className="flex w-full justify-center mt-5">
        <ActionButton
          className="font-bold uppercase text-lg mx-auto"
          onClick={handleCreateActivity}
          disabled={loading}
        >
          Paid by you and split equally
        </ActionButton>
      </div>
    </dialog>
  );
};
