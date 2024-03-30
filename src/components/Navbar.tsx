"use client";
import Link from "next/link";
import { Searchbar } from "@src/components";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push(`/`);
      toast.success("Logout successful");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <nav className="w-[100vw] bg-highlighter p-8 py-4 text-xl flex justify-between items-center ">
      <h2 className="text-2xl font-bold">
        {" "}
        <Link href={"/"} className="focus:outline-none">
          BillSpliter
        </Link>{" "}
      </h2>
      {/* <Searchbar /> */}
      <div className="relative group cursor-default ">
        <span>Pushpendra Pal</span>
        <div
          onClick={logout}
          className="hidden group-hover:block absolute top-[100%] left-[50%] transform translate-x-[-50%] bg-white hover:bg-gray-200 text-black py-1 px-2 rounded-sm cursor-pointer "
        >
          Logout
        </div>
      </div>
    </nav>
  );
};
