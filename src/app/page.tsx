import Image from "next/image";
import logo from "@/public/logo.png";
import home_image from "@/public/home_image.png";
import { ActionButton } from "@src/components";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="h-[100vh] w-[100%] flex flex-row">
      <section className=" flex flex-1 flex-col justify-center items-end p-8 pr-[10rem]">
        <div>
          <div className="flex flex-row items-center gap-4">
            <Image src={logo} alt="logo" />
            <span className="text-3xl">BillSpliter</span>
          </div>
          <div className="flex flex-col gap-7 mt-[5rem]">
            <h2 className="text-6xl font-bold">Split with ease!</h2>
            <p className="text-lg">
              Easily split bills for various activities,
              <br /> from dining to shared purchases.
            </p>
          </div>
          <div className="mt-[3rem]">
            <Link href="/signup">
              <ActionButton className="font-bold uppercase text-xl">
                start now
              </ActionButton>
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col justify-center items-start pl-[10rem] ">
        <div>
          <Image src={home_image} alt="home_image" />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
