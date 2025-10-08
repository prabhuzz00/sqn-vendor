"uxe client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import {
  IoBagCheckOutline,
  IoBagHandle,
  IoBarChart,
  IoCashOutline,
  IoFileTrayFull,
} from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MyContext } from "@/context/ThemeProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { LuBanknote, LuMapPin } from "react-icons/lu";
import { fetchDataFromApi, uploadImage } from "@/utils/api";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/utils/useTranslation";

function NavLink({ href, children, className = "", activeClassName = "" }) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  );
}

const AccountSidebar = () => {
  const { t } = useTranslation();
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const context = useContext(MyContext);

  const router = useRouter();

  useEffect(() => {
    const userAvtar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvtar.push(context?.userData?.avatar);
      setPreviews(userAvtar);
    }
  }, [context?.userData]);

  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      const files = e.target.files;
      setUploading(true);

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];

          selectedImages.push(file);
          formdata.append(`avatar`, file);
        } else {
          context.alertBox(
            "error",
            "Please select a valid JPG , PNG or webp image file."
          );
          setUploading(false);
          return false;
        }
      }

      uploadImage("/api/user/user-avatar", formdata).then((res) => {
        setUploading(false);
        let avatar = [];
        avatar.push(res?.data?.avtar);
        setPreviews(avatar);
        context.alertBox("success", "Profile picture updated successfully!");
        // fetchDataFromApi(`/api/user/user-details`).then((res) => {
        //   context?.setUserData(res.data);
        // })
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    fetchDataFromApi(
      `/api/vendor/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((res) => {
      if (res?.error === false) {
        context.setIsLogin(false);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        context.setUserData(null);
        router.push("/");
      }
    });
  };
  return (
    <div className="card bg-white shadow-md rounded-md sticky top-[0px]">
      <div className="w-full p-5 flex items-center justify-center flex-col">
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">
          {uploading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {previews?.length !== 0 ? (
                previews?.map((img, index) => {
                  return (
                    <Image
                      width={110}
                      height={110}
                      src={img}
                      key={index}
                      className="w-full h-full object-cover"
                      alt="avatar"
                    />
                  );
                })
              ) : (
                <img src={"/user.jpg"} className="w-full h-full object-cover" />
              )}
            </>
          )}

          <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
            <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
              accept="image/*"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>

        <h3>{context?.userData?.name}</h3>
        <h6 className="text-[13px] font-[500]">{context?.userData?.email}</h6>
      </div>

      <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
        <li className="w-full">
          <NavLink href="/my-account" activeClassName="active">
            <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <FaRegUser className="text-[15px]" />
              {t("accountSidebar.myProfile")}
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink href="/my-account/bank-details" activeClassName="active">
            <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <LuBanknote className="text-[18px]" />{" "}
              {t("accountSidebar.bankDetails")}
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink href="/zone-management" activeClassName="active">
            <Button className="w-full !text-left !py-2 !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <LuMapPin className="text-[18px]" />{" "}
              Zone Management
            </Button>
          </NavLink>
        </li>

        {/* <li className="w-full">
          <NavLink href="/my-list" activeClassName="active">
            <Button className="w-full !py-2  !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <IoMdHeartEmpty className="text-[17px]" /> My List
            </Button>
          </NavLink>
        </li> */}

        <li className="w-full">
          <NavLink href="/my-orders" activeClassName="active">
            <Button className="w-full  !py-2 !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <IoBagHandle className="text-[17px]" />{" "}
              {t("accountSidebar.myOrders")}
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink href="/my-reports" activeClassName="active">
            <Button className="w-full  !py-2 !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <IoBarChart className="text-[17px]" />
              {t("accountSidebar.myReports")}
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink href="/product-inventory" activeClassName="active">
            <Button className="w-full  !py-2 !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <IoFileTrayFull className="text-[17px]" />{" "}
              {t("accountSidebar.productInventory")}
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink href="/rejected-product" activeClassName="active">
            <Button className="w-full  !py-2 !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <IoFileTrayFull className="text-[17px]" /> Rejected Product
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink href="/withdrawal" activeClassName="active">
            <Button className="w-full  !py-2 !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
              <IoCashOutline className="text-[17px]" />{" "}
              {t("accountSidebar.withdrawal")}
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <Button
            className="w-full !py-2  !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2"
            onClick={logout}
          >
            <IoIosLogOut className="text-[18px]" /> {t("accountSidebar.logout")}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
