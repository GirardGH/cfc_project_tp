import { PhoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

const people = [
  {
    name: "Jane Cooper",
    title: "Paradigm Representative",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

export default function UserMenu({ loggedIn, setVisible }) {

  return (
    <div className=" w-[280px] lg:absolute lg:top-12 lg:right-60 shadow-md bg-white z-50 flex flex-col gap-4 py-4 px-0 hidden lg:block "
    onMouseOver={() => setVisible(true)}
    onMouseLeave={() => setVisible(false)}>
      <h4 className="text-center font-semibold">Welcome To CFC !</h4>
      {loggedIn ? (
        <div className="flex justify-center gap-4 mt-2">
        <img src="https://www.pngarts.com/files/3/Avatar-PNG-Picture.png"
            alt="avatar"
            className="h-24 w-24"
              />
          <div className="flex flex-col justify-center">
            <span className="text-sm mt-1">Welcome Back,</span>
            <div className="overflow-x-hidden w-28 mt-2">
            <h3 className="font-semibold">GIRARD Ghislain</h3>
            </div>
           <span className=" text-blue-600 underline text-sm cursor-pointer mt-1">Sign out</span>
          </div>     
        </div>
        
        ) : (
          <div className="!flex !gap-2 py-0 px-4">
            <button className="flex items-center justify-center p-1 bg-[#770c14] font-normal text-stone-50 cursor-pointer w-3/4 rounded-sm">Register</button>
            <button className="flex items-center justify-center p-1 bg-black text-stone-50 font-normal cursor-pointer w-1/4 rounded-sm">Login</button>
          </div>


        )}
        <ul className="">
          <li className="h-7 hover:bg-black hover:text-white px-4 w-full cursor-pointer">
            <Link href="/profile">Account</Link>
          </li>
          <li className="h-7 hover:bg-black hover:text-white px-4 w-full cursor-pointer">
            <Link href="/profile/orders">My orders</Link>
          </li>
          <li className="h-7 hover:bg-black hover:text-white px-4 w-full cursor-pointer">
            <Link href="/profile/message">Message Center</Link>
          </li>
          <li className="h-7 hover:bg-black hover:text-white px-4 w-full cursor-pointer">
            <Link href="/profile/address">Address</Link>
          </li>
          <li className="h-7 hover:bg-black hover:text-white px-4 w-full cursor-pointer">
            <Link href="/profile/whishlist">Whishlist</Link>
          </li>


        </ul>
    </div>
  )

}
