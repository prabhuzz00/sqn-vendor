"use client";
import React, { useContext, useState, useEffect } from "react";

import { Button } from "@mui/material";
import Link from "next/link";
import { MyContext } from "@/context/ThemeProvider";


const Header = ({ logo = "/sooqna.svg" }) => {

  const context = useContext(MyContext);

  return (
    <>
      {
        context?.isHeaderFooterShow === true &&
        <header className="fixed bg-white lg:sticky left-0 w-full top-0 z-[101] py-3">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="logo w-[140px]">
                <Link href="/"><img src={logo} className="logo" alt="logo" /></Link>
              </div>


              <nav className="flex items-center justify-center m-auto w-[70%] gap-4">
                <Link href={"/"}
                  className="font-[600] text-[14px] hover:text-primary">Sell Online</Link>
                <Link href={"/"} className="font-[600] text-[14px] hover:text-primary">How it works</Link>
                <Link href={"/"} className="font-[600] text-[14px] hover:text-primary">Pricing & Commission</Link>
                <Link href={"/"} className="font-[600] text-[14px] hover:text-primary">Shipping & Returns</Link>
                <Link href={"/"} className="font-[600] text-[14px] hover:text-primary">Grow Business</Link>
                <Link href={"/"} className="font-[600] text-[14px] hover:text-primary">Don’t have GST?</Link>
              </nav>



              <div className="flex items-center gap-2">
                <Link href="/login"> <Button className="btn-org btn-border btn-sm h-[36px]" size="small">Login</Button></Link>
                <Link href="/become-vendor"> <Button className="btn-org btn-sm  h-[36px]" size="small">Start Selling</Button></Link>
              </div>

            </div>
          </div>
        </header>
      }

    </>
  );
};

export default Header;
