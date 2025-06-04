"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import Drawer from "@mui/material/Drawer";

import { MyContext } from "@/context/ThemeProvider";

import { IoCloseSharp } from "react-icons/io5";
import AddBank from "@/app/my-account/addBank";
import { useTranslation } from "@/utils/useTranslation";

const Footer = () => {
  const { t } = useTranslation();
  const context = useContext(MyContext);

  return (
    <>
      {context?.isHeaderFooterShow === true && (
        <>
          <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] pt-3 pb-[100px] lg:pb-3 bg-[#2f3643] text-white">
            <div className="container flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0">
              <ul className="flex items-center gap-2">
                <li className="list-none">
                  <Link
                    href="/"
                    target="_blank"
                    className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all"
                  >
                    <FaFacebookF className="text-[17px] group-hover:text-white" />
                  </Link>
                </li>

                <li className="list-none">
                  <Link
                    href="/"
                    target="_blank"
                    className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all"
                  >
                    <AiOutlineYoutube className="text-[21px] group-hover:text-white" />
                  </Link>
                </li>

                <li className="list-none">
                  <Link
                    href="/"
                    target="_blank"
                    className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all"
                  >
                    <FaPinterestP className="text-[17px] group-hover:text-white" />
                  </Link>
                </li>

                <li className="list-none">
                  <Link
                    href="/"
                    target="_blank"
                    className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all"
                  >
                    <FaInstagram className="text-[17px] group-hover:text-white" />
                  </Link>
                </li>
              </ul>

              <p className="text-[13px] text-center mb-0">© 2025 - SOOUQNA</p>
            </div>
          </div>
        </>
      )}

      {/* Bank Panel */}
      <Drawer
        open={context.openBankPanel}
        onClose={context.toggleBankPanel(false)}
        anchor={"right"}
        className="addressPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)] overflow-hidden">
          <h4>
            {context?.bankMode === "add"
              ? t("bankPage.addBankDetails")
              : `${t("bankBox.edit")} ${t("bankPage.bankDetails")}`}{" "}
          </h4>
          <IoCloseSharp
            className="text-[20px] cursor-pointer"
            onClick={context.toggleBankPanel(false)}
          />
        </div>

        <div className="w-full max-h-[100vh] overflow-auto">
          <AddBank />
        </div>
      </Drawer>
    </>
  );
};

export default Footer;
