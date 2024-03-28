"use client";

import { ActionButton, CreateActivityModal } from "@/src/components";
import { Navbar } from "@/src/components";
import Link from "next/link";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const DashboardPage = () => {

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <main className="flex flex-col">
      <Navbar />
      <section className="p-8 h-[100%] flex flex-col">
        <div className="flex items-center justify-between my-4 ">
          <h1 className="text-5xl ">User's dashboard</h1>
          {/* <div className="cursor-pointer">
            <FaRegStar size={35} className="text-muted hover:text-white" />
            <FaStar size={35} />
          </div> */}
          <div className="cursor-pointer">
          <ActionButton className="font-bold uppercase text-l" onClick={()=>setShowModal(true)} >
              Create 
            </ActionButton>
          </div>
        </div>
        <div className="text-xl">
          <span>
            Total amount: <span className="text-red-400">5000</span>
          </span>
          {/* <span>You're all settled up!</span> */}
        </div>
        <div className=" border-y-2 border-gray-700  w-[50%] mx-auto mt-10 "></div>
        <div className=" h-[66vh] flex py-8 flex-col gap-4 items-center overflow-y-scroll no-scrollbar scroll-smooth ">
          <Link href={"#"} className="w-[70%] px-6 py-5 bg-gray-600 hover:bg-gray-700 flex justify-between items-center " >
            <h4>Title</h4>
            <div className="flex items-center divide-x-2 divide-gray-400" >
              <p className="px-5" > You have lent Rs <span className="text-green-400 " >50</span></p>
              <span className="px-5" >5 Members</span>
              <span className="px-5"  >24-2-24</span>
            </div>
          </Link>

        </div>
        <div className=" border-y-2 border-gray-700  w-[50%] mx-auto "></div>
      </section>
        {
          showModal && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800/50" onClick={()=>setShowModal(false)}></div>
          )
        }
        <CreateActivityModal open={showModal} closeModal={()=>setShowModal(false)} />
    </main>
  );
};

export default DashboardPage;
