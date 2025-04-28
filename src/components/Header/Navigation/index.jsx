"use client"
import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { GoRocket } from "react-icons/go";
// import CategoryPanel from "./CategoryPanel";

import "../Navigation/style.css";
// import MobileNav from "./MobileNav";
import { MyContext } from "@/context/ThemeProvider";
import Link from "next/link";
import CategoryPanel from "./CategoryPanel";
import MobileNav from "./MobileNav";

const Navigation = (props) => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [catData, setCatData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    setCatData(context?.catData);
  }, [context?.catData]);

  useEffect(() => {
    setIsOpenCatPanel(props.isOpenCatPanel);
  }, [props.isOpenCatPanel])

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  return (
    <>
      <nav className="navigation bg-gray-900">
        <div className="container flex items-center justify-start lg:justify-end gap-8">
          {
            context?.windowWidth > 992 &&
            <div className="col_1 w-[20%]">
              <Button
                className="!text-gray-300 !font-[600] gap-2 w-full"
                onClick={openCategoryPanel}
              >
                <RiMenu2Fill className="text-[18px]" />
                Shop By Categories
                <LiaAngleDownSolid className="text-[13px] ml-auto font-bold" />
              </Button>
            </div>
          }


          <div className="col_2 w-full lg:w-[60%]">
            <ul className="flex items-center gap-2 nav">
              <li className="list-none">
                <Link href="/" className="link transition text-[14px] font-[500]">
                  <Button className="link transition !font-[500] !text-gray-300 hover:!text-primary !py-4">
                    Home
                  </Button>
                </Link>
              </li>


              {
                catData?.length !== 0 && catData?.map((cat, index) => {
                  return (
                    <li className="list-none relative" key={index}>
                      <Link href={`/products?catId=${cat?._id}`} className="link transition text-[14px] !font-[500]">
                        <Button className="link transition !font-[500] !text-gray-300 hover:!text-primary !py-4">
                          {cat?.name}
                        </Button>
                      </Link>

                      {
                        cat?.children?.length !== 0 &&
                        <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                          <ul>
                            {
                              cat?.children?.map((subCat, index_) => {
                                return (
                                  <li className="list-none w-full relative" key={index_}>
                                    <Link href={`/products?subCatId=${subCat?._id}`} className="w-full">
                                      <Button className="!text-[rgba(0,0,0,0.8)]  w-full !text-left !justify-start !rounded-none">
                                        {subCat?.name}
                                      </Button>
                                    </Link>


                                     {
                                        subCat?.children?.length !== 0 &&
                                        <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                          <ul>
                                            {
                                              subCat?.children?.map((thirdLavelCat, index__) => {
                                                return (
                                                  <li className="list-none w-full" key={index__}>
                                                    <Link href={`/products?thirdLavelCatId=${thirdLavelCat?._id}`} className="w-full">
                                                      <Button className="!text-[rgba(0,0,0,0.8)]  w-full !text-left !justify-start !rounded-none">
                                                        {thirdLavelCat?.name}
                                                      </Button>
                                                    </Link>
                                                  </li>)
                                              })
                                            }



                                          </ul>
                                        </div>
                                      }


                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      }
                    </li>
                  )
                })
              }


            </ul>
          </div>

          <div className="col_3 w-[20%] hidden lg:block">
            <p className="text-[14px] !text-gray-300 font-[500] flex items-center gap-3 mb-0 mt-0">
              <GoRocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* category panel component */}
      {
        catData?.length !== 0 &&
        <CategoryPanel
          isOpenCatPanel={isOpenCatPanel}
          setIsOpenCatPanel={setIsOpenCatPanel}
          propsSetIsOpenCatPanel={props.setIsOpenCatPanel}
          data={catData}
        />
      }


      {
        context?.windowWidth < 992 && <MobileNav />
      }



    </>
  );
};

export default Navigation;
