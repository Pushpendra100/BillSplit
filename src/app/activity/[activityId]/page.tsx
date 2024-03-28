import { ActionButton } from "@/src/components";
import { Navbar } from "@/src/components/Navbar";
import Link from "next/link";

const ActivityPage = () => {
  return (
    <main className="flex flex-col h-[100vh]">
      <Navbar />
      <div className=" h-[100%] flex divide-x-2 divide-gray-400">
        <section className=" h-full flex flex-col items-center pt-10">
          <h3 className="text-xl font-bold">Members</h3>
          <div className=" flex flex-col gap-3 p-5">
            <Link
              href={""}
              className="bg-gray-600 hover:bg-gray-700 py-2 px-4 w-[15vw] max-w-[15vw] text-center rounded-sm truncate"
            >
              Pushpendra Pal
            </Link>
            <Link
              href={""}
              className="bg-gray-600 hover:bg-gray-700 py-2 px-4 w-[15vw] max-w-[15vw] text-center rounded-sm truncate"
            >
              PushpendraPushpendra Pal
            </Link>
          </div>
        </section>
        <section className="w-[100%] pt-10 px-5 flex flex-col ">
          <div className="flex items-start justify-between text-lg">
            <div className="w-[60%] flex flex-col gap-5">
              <h1 className="text-5xl">Title</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
              </p>
            </div>
            <div className="flex flex-col gap-3 justify-end">
              <span className="text-right">5 Members</span>
              <span className="text-right">24-2-24 12:00 am</span>
              <span className="text-right">Creater: Pushpendra Pal</span>
            </div>
          </div>
          <div className=" my-10 h-full flex justify-center items-center text-lg">
            <div className="w-[70%] h-[80%] border-2 border-gray-600 flex flex-col gap-7 justify-center items-center ">
              <p className="w-[60%] text-center">
                You have to pay Rs 100 to Creator
              </p>
              <ActionButton className="font-bold uppercase">
                Settle
              </ActionButton>
              {/* <ActionButton className=" bg-red-500 hover:bg-red-600 font-bold uppercase">
                Delete
              </ActionButton> */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ActivityPage;
