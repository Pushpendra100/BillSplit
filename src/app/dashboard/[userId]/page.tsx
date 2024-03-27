import { ActionButton } from "@/src/components";
import Navbar from "@/src/components/Navbar";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const DashboardPage = () => {
  return (
    <main className="h-[100vh] flex flex-col">
      <Navbar />
      <section className="p-8 h-[100%] flex flex-col">
        <div className="flex items-center justify-between my-4 ">
          <h1 className="text-5xl ">User's dashboard</h1>
          {/* <div className="cursor-pointer">
            <FaRegStar size={35} className="text-muted hover:text-white" />
            <FaStar size={35} />
          </div> */}
          <div className="cursor-pointer">
          <ActionButton className="font-bold uppercase text-l"  >
              <Link href={"/signup"} >Create</Link> 
            </ActionButton>
          </div>
        </div>
        <div className="text-xl">
          <span>
            Total amount: <span className="text-red-500">5000</span>
          </span>
          {/* <span>You're all settled up!</span> */}
        </div>
        <div className=" border-y-2 border-gray-700  w-[50%] mx-auto mt-10 "></div>
        <div className=" h-[66vh] flex py-8 flex-col gap-4 items-center overflow-y-scroll no-scrollbar scroll-smooth ">
          <Link href={"#"} className="w-[70%] px-6 py-5 bg-gray-600 hover:bg-gray-700 " >
            <h4>Title</h4>
          </Link>

        </div>
        <div className=" border-y-2 border-gray-700  w-[50%] mx-auto "></div>
      </section>
    </main>
  );
};

export default DashboardPage;
