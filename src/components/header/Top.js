import React from 'react'
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Link from "next/link";
import UserMenu from './UserMenu';

export default function Top() {
  return (
    <div className="flex flex-col laptop:flex-col-reverse">
    <div className="bg-white flex justify-end laptop:justify-center items-center w-[100svw]">
      <div className="hidden laptop:flex laptop:w-fit laptop:h-fit laptop:px-8 laptop:mr-auto laptop:items-center">
        <MagnifyingGlassIcon className="w-8 h-8" />
        <div className=" font-medium text-lg pl-3">RECHERCHE</div>
      </div>
      <div className="py-2 px-4 mr-auto laptop:mr-0">
        <Link href="/">
          <image
            src="https://res.cloudinary.com/db2sa2bxv/image/upload/v1676456828/logoCFC_yswlhx.svg"
            alt="logo"
            className="w-24 h-24 mx-2 my-2"
          />
        </Link>
      </div>
      <div className="flex px-4 laptop:px-8 laptop:ml-auto relative">
        <div className="w-fit h-fit px-1 laptop:hidden">
          <MagnifyingGlassIcon className="w-8 h-8" />
        </div>
        <Link href="/accedez-a-votre-compte">
          <div className="w-fit h-fit px-1 laptop:pr-6">
            <UserIcon className="w-8 h-8" />
          </div>
        </Link>
        <div className="w-fit h-fit px-1">
          <ShoppingBagIcon className="w-8 h-8" />
        </div>
      </div>
    </div>
    <div className="bg-[#006837] flex justify-center items-center h-10">
      <div className="px-2">
        <p className="text-white text-sm">SHOP</p>
      </div>
      <div className="px-2">
        <p className="text-white text-sm">RECETTES</p>
      </div>
      <div className="px-2">
        <p className="text-white text-sm">LE MAGASIN</p>
      </div>
    </div>
    <UserMenu className=""/>
  </div>
  )
}
