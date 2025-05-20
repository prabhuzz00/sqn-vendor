"use client";
import React, { useContext } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import { IoChatboxOutline } from "react-icons/io5";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import Drawer from "@mui/material/Drawer";

import { MyContext } from "@/context/ThemeProvider";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { ProductZoom } from "../ProductZoom";
import { IoCloseSharp } from "react-icons/io5";
import { ProductDetailsComponent } from "../ProductDetails";
import AddBank from "@/app/my-account/addBank";

const Footer = () => {
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

              <p className="text-[13px] text-center mb-0">© 2025 - SOQQNA</p>

              {/* <div className="flex items-center gap-1">
                <img src="/carte_bleue.png" alt="image" />
                <img src="/visa.png" alt="image" />
                <img src="/master_card.png" alt="image" />
                <img src="/american_express.png" alt="image" />
                <img src="/paypal.png" alt="image" />
              </div> */}
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
          <h4>{context?.bankMode === "add" ? "Add" : "Edit"} Bank Details </h4>
          <IoCloseSharp
            className="text-[20px] cursor-pointer"
            onClick={context.toggleBankPanel(false)}
          />
        </div>

        <div className="w-full max-h-[100vh] overflow-auto">
          <AddBank />
        </div>
      </Drawer>

      <Dialog
        open={context?.openProductDetailsModal.open}
        fullWidth={context?.fullWidth}
        maxWidth={context?.maxWidth}
        onClose={context?.handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]"
              onClick={context?.handleCloseProductDetailsModal}
            >
              <IoCloseSharp className="text-[20px]" />
            </Button>
            {context?.openProductDetailsModal?.item?.length !== 0 && (
              <>
                <div className="col1 w-[40%] px-3 py-8">
                  <ProductZoom
                    images={context?.openProductDetailsModal?.item?.images}
                  />
                </div>

                <div className="col2 w-[60%] py-8 px-8 pr-16 productContent ">
                  <ProductDetailsComponent
                    item={context?.openProductDetailsModal?.item}
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
