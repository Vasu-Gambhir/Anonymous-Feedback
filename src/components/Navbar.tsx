"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 bg-white shadow-md">
      <div className="cotainer mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-3">
          <a href="#">
            <Image
              src="/Logo.webp" // Path to your logo in the public folder
              alt="Anonymous Feedback Logo"
              width={50}
              height={50}
              className="h-14 w-14 md:h-14 md:w-14" // Adjust the size of the logo here
            />
          </a>

          <a
            className="text-2xl font-extrabold text-gray-800 mb-4 md:mb-0"
            href="#"
          >
            Anonymous Feedback
          </a>
        </div>
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="mr-4 text-lg font-semibold text-gray-600">
              Welcome, {user?.username || user?.email}
            </span>
            <Button
              className="w-full md:w-auto bh-gray-800 text-white hover:bg-gray-700"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="bg-gray-800 text-white hover:bg-gray-700 w-full md:w-auto">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
