"use client";
import React, { ComponentProps, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ActionButton } from ".";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation";

type LinkCardDataType = {
  title: String
  amount: Number
  membersCount: Number
  dateTime: Date 
}

type CreateActivityModalType = ComponentProps<"dialog"> & {
  closeModal: () => void;
  setLinkCardData: (value: LinkCardDataType[] | ((prevVar: LinkCardDataType[]) => LinkCardDataType[])) => void;
};

export const CreateActivityModal = ({
  closeModal,
  setLinkCardData,
  ...props
}: CreateActivityModalType) => {
  const params = useParams();
  const [activity, setActivity] = useState({
    title: "",
    description: "",
    amount: "",
    members: ['Pushpendra@g.com'],
  });

  const [loading, setLoading] = useState(false);

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
      if(response){
        response.data.user.allActivities.forEach((activityInfo: any)  => {
          setLinkCardData((prev)=> [...prev, {
            title: activityInfo.title,
            amount: activityInfo.money,
            membersCount: activityInfo.membersCount,
            dateTime: activityInfo.createdAt
          }])
        });
      }

      toast.success("Activity created");

    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      closeModal();
      setActivity(
        {
          title: "",
          description: "",
          amount: "",
          members: ['Pushpendra@g.com'],
        }
      )
    }
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
          className="px-5 py-1  w-[100%] sm0:py-3  placeholder:text-zinc-500 text-black bg-zinc-200 focus:bg-zinc-300  focus:outline-none "
          type="search"
          placeholder="Add user"
        />
        <button className="text-white absolute end-0 bottom-0 top-0 bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium  px-5 py-1">
          Search
        </button>
      </div>
      <div className="w-[100%] mt-5 mb-5 px-5 py-2 border border-gray-200 rounded-md shadow-inner flex flex-wrap gap-4">
        <div className=" flex w-fit rounded-sm bg-zinc-200">
          <p className="max-w-[14rem] truncate p-2">
            pushpendrapushpendrapushpendrapushpendra
          </p>
          <span className="bg-zinc-300 hover:bg-zinc-400 p-2 cursor-pointer flex items-center ">
            <RxCross2 size={20} />
          </span>
        </div>
      </div>
      <div className="w-[100%] py-[1rem] flex flex-col gap-5 ">
        <input
          type="text"
          placeholder="Title"
          className="h-full w-full border-b border-gray-300 bg-transparent pt-4 pb-1.5 placeholder:text-gray-500 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          value={activity.title}
          onChange={(e) => setActivity({...activity, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Description"
          className="h-full w-full border-b border-gray-300 bg-transparent pt-4 pb-1.5 placeholder:text-gray-500 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          value={activity.description}
          onChange={(e) => setActivity({...activity, description: e.target.value})}

        />
        <input
          type="text"
          pattern="[0-9]*"
          placeholder="Enter amount"
          className="h-full w-[30%] border-b border-gray-300 bg-transparent pt-4 pb-1.5 placeholder:text-gray-500 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          value={activity.amount}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if(e.target.value === '' || re.test(e.target.value)){
              setActivity({...activity, amount: e.target.value})
            }
          }}
        />
      </div>
      <div className="flex w-full justify-center mt-5">
        <ActionButton
          className="font-bold uppercase text-lg mx-auto"
          onClick={handleCreateActivity}
        >
          Paid by you and split equally
        </ActionButton>
      </div>
    </dialog>
  );
};
