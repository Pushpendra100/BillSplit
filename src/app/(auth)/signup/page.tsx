"use client"
import Link from "next/link"
import { ActionButton } from "@src/components";
import { useState } from "react";


const SignUpPage = () => {
  return (
    <main className="h-[100%]" >
        <div className="text-right text-muted  ">
            Already have an account? <Link href={"/signin"} className="hover:text-blue-500" >Sign in</Link>
        </div>
        <div className=" flex flex-col h-full items-center justify-center p-8" >
            <div>
                <h2 className="text-6xl mb-[3.5rem] font-bold" >Sign up</h2>
                <ActionButton className="font-bold bg-white text-black text-xl w-[25vw]" >Google</ActionButton>
                <div className="border-t-2 border-muted flex flex-col gap-4 text-xl mt-[2rem] pt-[2rem] w-[25vw] " >
                    <input
                        type="text"
                        placeholder="Full name"
                        className="bg-transparent broder-solid border-2 border-gray-700 px-6 py-4"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-transparent broder-solid border-2 border-gray-700 px-6 py-4 "
                    />
                    <input
                        type="password"
                        placeholder="Password min. 8 characters"
                        className="bg-transparent broder-solid border-2 border-gray-700 px-6 py-4"
                    />
                    <div className="mt-[2rem]" >
                        <ActionButton className=" font-bold uppercase bg-highlighter text-black text-xl w-[25vw]"  >
                            Sign Up
                        </ActionButton>
                    </div>
                </div>
            </div>
        </div>
  </main>
  )
}

export default SignUpPage
