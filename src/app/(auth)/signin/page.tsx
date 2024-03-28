"use client"
import Link from "next/link"
import { ActionButton } from "@src/components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";

const SignInPage = () => {

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [buttonDiabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignin = async() => {
        try {
            setButtonDisabled(true)
            setLoading(true);

            if(!user.email) {
                toast.error("Please enter your email")
                return
            }

            if(!user.password) {
                toast.error("Please enter your password")
                return
            }

            const response = await axios.post("/api/users/signin", user)
            if(response.data.error){
                toast.error(response.data.error);
                return
            }
            console.log("Signin success", response.data)


            router.push(`dashboard/${123}`);
            toast.success("success")

        } catch (error: any) {

            console.log("Signin failed", error.message);
            toast.error(error.message)

        }finally{
            setButtonDisabled(false);
            setLoading(false);
        }
    }

    return (
        <main className="h-[100%]" >
        <div className="text-right text-muted  ">
            Don't have an account? <Link href="/signup" className="hover:text-blue-500" >Sign up</Link>
        </div>
        <div className=" flex flex-col h-full items-center justify-center p-8" >
            <div>
                <h2 className="text-6xl mb-[3.5rem] font-bold" >{loading?"Loading...":"Sign in"}</h2>
                <ActionButton className="font-bold bg-white text-black text-xl w-[25vw]" >Google</ActionButton>
                <div className="border-t-2 border-muted flex flex-col gap-4 text-xl mt-[2rem] pt-[2rem] w-[25vw] " >
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-transparent broder-solid border-2 border-gray-700 px-6 py-4 "
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Password min. 8 characters"
                        className="bg-transparent broder-solid border-2 border-gray-700 px-6 py-4"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                    <div className="mt-[2rem]" >
                        <ActionButton className=" font-bold uppercase bg-highlighter text-black text-xl w-[25vw]" onClick={onSignin} disabled={buttonDiabled} >
                            Sign In
                        </ActionButton>
                    </div>
                </div>
            </div>
        </div>
  </main>
    )
  }
  
  export default SignInPage
  