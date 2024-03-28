"use client"
import Link from "next/link"
import { ActionButton } from "@src/components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [buttonDiabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async() => {
        try {
            setButtonDisabled(true)
            setLoading(true);

            if(!user.name) {
                toast.error("Please enter your name")
                return
            }
            if(user.name.length<2){
                toast.error("Name should be atleast 2 characters long")
                return
            }
            if(!user.email) {
                toast.error("Please enter your email")
                return
            }
            const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!user.email.match(mailformat)) {
                toast.error("Incorrect email format !");
                return;
            }
            if(!user.password) {
                toast.error("Please enter your password")
                return
            }
            if(user.password.length<8){
                toast.error("Password must be atleast 8 characters long")
                return
            }
            
            const response = await axios.post("/api/users/signup", user)
            if(response.data.error){
                toast.error(response.data.error);
                return
            }
            console.log("Signup success", response.data)

            router.push(`dashboard/${123}`);
            toast.success("success")

        } catch (error: any) {

            console.log("Signup failed", error.message);
            toast.error(error.message)

        }finally{
            setButtonDisabled(false);
            setLoading(false);
        }
    }



  return (
    <main className="h-[100%]" >
        <div className="text-right text-muted  ">
            Already have an account? <Link href="/signin" className="hover:text-blue-500" >Sign in</Link>
        </div>
        <div className=" flex flex-col h-full items-center justify-center p-8" >
            <div>
                <h2 className="text-6xl mb-[3.5rem] font-bold" >{loading?"Loading...":"Sign up"}</h2>
                <ActionButton className="font-bold bg-white text-black text-xl w-[25vw]" >Google</ActionButton>
                <div className="border-t-2 border-muted flex flex-col gap-4 text-xl mt-[2rem] pt-[2rem] w-[25vw] " >
                    <input
                        type="text"
                        placeholder="Full name"
                        className="bg-transparent broder-solid border-2 border-gray-700 px-6 py-4"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                    />
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
                        <ActionButton className=" font-bold uppercase bg-highlighter text-black text-xl w-[25vw]" onClick={onSignup} disabled={buttonDiabled}  >
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
