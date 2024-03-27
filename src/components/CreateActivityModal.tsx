import React, { ComponentProps } from "react";
import { RxCross2 } from "react-icons/rx";
import { ActionButton } from ".";

type CreateActivityModalType = ComponentProps<"dialog"> & {
  closeModal: () => void;
};

export const CreateActivityModal = ({
  closeModal,
  ...props
}: CreateActivityModalType) => {
  return (
    <dialog
      {...props}
      className=" w-[40vw] max-w-[50rem] max-h-[50rem] p-8 rounded-md fixed top-[50%] tranform translate-y-[-50%]"
    >
      <h2 className="text-4xl font-bold">Create Activity</h2>
      <div className="bg-pink-500 mt-6 relative">
        <input
          className="px-5 py-1  w-[100%] sm:py-3  placeholder:text-zinc-500 text-black bg-zinc-200 focus:bg-zinc-300  focus:outline-none "
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
        />
        <input
          type="text"
          placeholder="Description"
          className="h-full w-full border-b border-gray-300 bg-transparent pt-4 pb-1.5 placeholder:text-gray-500 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        <input
          type="number"
          placeholder="Enter amount"
          className="h-full w-[30%] border-b border-gray-300 bg-transparent pt-4 pb-1.5 placeholder:text-gray-500 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
      </div>
      <div className="flex w-full justify-center mt-5">
      <ActionButton
        className="font-bold uppercase text-l mx-auto"
        onClick={() => closeModal()}
      >
        Paid by you and split equally
      </ActionButton>
      </div>
    </dialog>
  );
};
