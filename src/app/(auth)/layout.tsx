import Link from "next/link"
import { GiDividedSquare } from "react-icons/gi";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-[100vh] w-[100vw] flex" >
        <section className="h-full bg-highlighter w-[25vw] text-black p-8 flex flex-col  " >
            <h2 className="text-2xl font-bold" > <Link href={"/"} >BillSpliter</Link> </h2>
            <div className="flex flex-col h-full justify-center gap-8 text-xl" >
                <h3 className="text-[3rem] font-medium" >Splitting</h3>
                <ul className="flex flex-col gap-2" >
                    <li className="flex items-center gap-4" > <GiDividedSquare/> Split group expenses easily</li>
                    <li className="flex items-center gap-4" > <GiDividedSquare/> Manage all spending together</li>
                    <li className="flex items-center gap-4" > <GiDividedSquare/> No cost</li>
                    <li className="flex items-center gap-4" > <GiDividedSquare/> Expert Advise</li>
                </ul>
            </div>
        </section>
        <section className="h-full w-[75vw] p-8" >
            {children}   
        </section>
    </main>
  );
}
