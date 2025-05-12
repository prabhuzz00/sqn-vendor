"use client";

import { Button } from "@mui/material";
import { MdOutlineSell } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaWpforms } from "react-icons/fa";
import { GiGrowth } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="topBannerSection w-full bg-[#f5f2f2]">
        <div className="container flex items-center  h-auto">
          <div className="w-[65%] flex flex-col gap-4">
            <p className="text-primary text-[18px] mb-0 mt-0">
              Welcome To{" "}
              <span className="uppercase text-gray-800 font-semibold">
                Soouqna
              </span>
            </p>
            <h1 className="text-[60px] font-[800] leading-[70px]">
              Sell online to 1 Cr+ customers at
              <br />
              <span className="text-primary">0% Commission</span>
            </h1>

            <p className="text-[18px]">
              Become a Soouqna seller and grow your business{" "}
            </p>

            <div>
              <Link href="/become-vendor">
                <Button className="btn-org btn-lg h-[36px]" size="large">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-[40%] flex flex-col gap-4">
            <img src="/selling.png" className="w-full" />
          </div>
        </div>
      </section>

      <section className="w-full py-16 vendorSection2">
        <div className="container">
          <h2 className="text-center text-[30px]">
            Sell Online with
            <span className="text-primary uppercase pl-3">Soouqna</span>
          </h2>
          <p className="text-center text-[15px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. <br />
            Lorem Ipsum has been the industry standard dummy text ever since the
            1500s
          </p>

          <br />

          <div className="flex items-center justify-center gap-8">
            <div className="card shadow-sm hover:shadow-lg w-[20%] bg-white py-8 px-14 text-center flex items-center justify-center flex-col transition-all !rounded-md">
              <div
                className="icon mb-3 p-3 rounded-[20px] w-[70px] h-[70px] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(132, 188, 250) 0%, rgb(43, 112, 250) 100%)",
                  boxShadow: "0px 6px 10px 0px rgba(16, 73, 189, 0.3)",
                }}
              >
                <MdOutlineSell size={30} className="text-white" />
              </div>
              <h3 className="text-[22px]  text-gray-800">11 Lakh+</h3>
              <p className=" font-[400] text-[16px] mt-0 mb-0">
                Trust Soouqna to sell online
              </p>
            </div>

            <div className="card shadow-sm hover:shadow-lg w-[20%] bg-white py-8 px-14 text-center flex items-center justify-center flex-col transition-all !rounded-md">
              <div
                className="icon mb-3 p-3  rounded-[20px] w-[70px] h-[70px] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(247, 184, 175) 0%, rgb(248, 69, 45) 100%)",
                  boxShadow: "0px 6px 10px 0px rgba(16, 73, 189, 0.3)",
                }}
              >
                <PiUsersThree size={35} className="text-white" />
              </div>
              <h3 className="text-[22px]  text-gray-800">4 Crore+</h3>
              <p className=" font-[400] text-[16px] mt-0 mb-0">
                Customers buying across Syria
              </p>
            </div>

            <div className="card shadow-sm hover:shadow-lg w-[20%] bg-white py-8 px-14 text-center flex items-center justify-center flex-col transition-all !rounded-md">
              <div
                className="icon mb-3 p-3  rounded-[20px] w-[70px] h-[70px] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(160, 234, 194) 0%, rgb(49, 195, 105) 100%)",
                  boxShadow: "0px 6px 10px 0px rgba(16, 73, 189, 0.3)",
                }}
              >
                <TbTruckDelivery size={40} className="text-white" />
              </div>
              <h3 className="text-[22px]  text-gray-800">19000+</h3>
              <p className=" font-[400] text-[16px] mt-0 mb-0">
                Pincode Supported for delivery
              </p>
            </div>

            <div className="card shadow-sm hover:shadow-lg w-[20%] bg-white py-8 px-14 text-center flex items-center justify-center flex-col transition-all !rounded-md">
              <div
                className="icon mb-3 p-3  rounded-[20px] w-[70px] h-[70px] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgb(216, 170, 255) 0%, rgb(155, 44, 250) 100%)",
                  boxShadow: "0px 6px 10px 0px rgba(16, 73, 189, 0.3)",
                }}
              >
                <BiCategory size={40} className="text-white" />
              </div>
              <h3 className="text-[22px] text-gray-800">700+</h3>
              <p className=" font-[400] text-[16px] mt-0 mb-0">
                Categories to sell online
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 vendorSection3">
        <div className="container">
          <div className="flex items-center ">
            <div className="w-[50%]">
              <h2 className="text-[30px]">
                Why Suppliers Love{" "}
                <span className="text-primary uppercase">Soouqna</span>
              </h2>
              <p className="text-[16px]">
                All the benefits that come with selling on Soouqna are designed
                to help you sell more, and make it easier to grow your business.
              </p>

              <div className="flex  gap-4 flex-wrap mt-3">
                <div className="card  w-[45%] bg-white py-2  flex justify-start flex-col transition-all !rounded-md">
                  <div
                    className="icon mb-3 p-3 rounded-[20px] w-[60px] h-[60px] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(132, 188, 250) 0%, rgb(43, 112, 250) 100%)",
                      boxShadow: "0px 6px 10px 0px rgba(16, 73, 189, 0.3)",
                    }}
                  >
                    <GiReceiveMoney size={30} className="text-white" />
                  </div>
                  <h3 className="text-[18px]  text-gray-800">
                    0% Commission Fee
                  </h3>
                  <p className=" font-[400] text-[14px] mt-0 mb-0">
                    Suppliers selling on Soouqna keep 100% of their profit by
                    not paying any commission
                  </p>
                </div>

                <div className="card  w-[45%] bg-white py-2  flex justify-start flex-col transition-all !rounded-md">
                  <div
                    className="icon mb-3 p-3 rounded-[20px] w-[60px] h-[60px] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(247, 184, 175) 0%, rgb(248, 69, 45) 100%)",
                      boxShadow: "0px 6px 10px 0px rgba(16, 73, 189, 0.3)",
                    }}
                  >
                    <FaWpforms size={30} className="text-white" />
                  </div>
                  <h3 className="text-[18px]  text-gray-800">
                    0 Penalty Charges
                  </h3>
                  <p className=" font-[400] text-[14px] mt-0 mb-0">
                    Sell online without the fear of order cancellation charges
                    with 0 Penalty for late dispatch or order cancellations.
                  </p>
                </div>

                <div className="card  w-[45%] bg-white py-2  flex justify-start flex-col transition-all !rounded-md">
                  <div
                    className="icon mb-3 p-3 rounded-[20px] w-[60px] h-[60px] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(216, 170, 255) 0%, rgb(155, 44, 250) 100%)",
                    }}
                  >
                    <GiGrowth size={30} className="text-white" />
                  </div>
                  <h3 className="text-[18px]  text-gray-800">
                    Growth for Every Supplier
                  </h3>
                  <p className=" font-[400] text-[14px] mt-0 mb-0">
                    From small to large and unbranded to branded.
                  </p>
                </div>

                <div className="card  w-[45%] bg-white py-2  flex justify-start flex-col transition-all !rounded-md">
                  <div
                    className="icon mb-3 p-3 rounded-[20px] w-[60px] h-[60px] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(160, 234, 194) 0%, rgb(49, 195, 105) 100%)",
                      boxShadow: "0px 6px 10px 0px rgba(16, 73, 189, 0.3)",
                    }}
                  >
                    <FaRegHandshake size={30} className="text-white" />
                  </div>
                  <h3 className="text-[18px]  text-gray-800">
                    Ease of Doing Business
                  </h3>
                  <p className=" font-[400] text-[14px] mt-0 mb-0">
                    Suppliers selling on Soouqna keep 100% of their profit by
                    not paying any commission
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[50%]">
              <img src="/screen.png" className="relative -right-[5%]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
