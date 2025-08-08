"use client";
import { Button } from "@mui/material";
import { GiReceiveMoney } from "react-icons/gi";
import { FaWpforms } from "react-icons/fa";
import { GiGrowth } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/utils/useTranslation";

export default function Home() {
  const { locale } = useLanguage();
  const { t } = useTranslation();

  return (
    <>
      <section className="topBannerSection w-full bg-[#f5f2f2]">
        <div className="container flex items-center  h-auto">
          <div className="w-[65%] flex flex-col gap-4 part1">
            <p className="text-primary text-[18px] mb-0 mt-0">
              {t("home.welcome")}{" "}
              <span className="uppercase text-gray-800 font-semibold">
                Soouqna
              </span>
            </p>
            <h1 className="text-[60px] font-[800] leading-[70px]">
              {t("home.headline")}
              <br />
              <span className="text-primary">{t("home.commission")}</span>
            </h1>

            <p className="text-[18px]">{t("home.description")} </p>

            <div>
              <Link href="/become-vendor">
                <Button className="btn-org btn-lg h-[36px]" size="large">
                  {t("home.startSelling")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-[40%] part2 flex flex-col gap-4">
            <img src="/selling.png" className="w-full" />
          </div>
        </div>
      </section>

      <section className="w-full py-16 vendorSection3">
        <div className="container">
          <div className="flex items-center wrap">
            <div className="w-[50%] part1">
              <h2 className="text-[30px]">
                {t("home.whyLove")}{" "}
                <span className="text-primary uppercase">Soouqna</span>
              </h2>
              <p className="text-[16px]">{t("home.benefits")}</p>

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
                    {t("home.commissionFee")}
                  </h3>
                  <p className=" font-[400] text-[14px] mt-0 mb-0">
                    {t("home.commissionInfo")}
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
                    {t("home.penaltyCharges")}
                  </h3>
                  <p className=" font-[400] text-[14px] mt-0 mb-0">
                    {t("home.penaltyInfo")}
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
                    {t("home.growth")}
                  </h3>
                  <p className=" font-[400] text-[14px] mt-0 mb-0">
                    {t("home.growthInfo")}
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
                    {t("home.ease")}
                  </h3>
                  <p className=" font-[400] text-[14px] mt-0 mb-0">
                    {t("home.easeInfo")}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[50%] part2">
              <img src="/screen.png" className="relative -right-[5%]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
