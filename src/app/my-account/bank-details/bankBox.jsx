import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MyContext } from "@/context/ThemeProvider";
import { useTranslation } from "@/utils/useTranslation";

const ITEM_HEIGHT = 48;

const BankBox = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const context = useContext(MyContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeBank = (id) => {
    setAnchorEl(null);
    props.removeBank(id);
  };

  const editBank = (id) => {
    setAnchorEl(null);
    context?.setOpenBankPanel(true);
    context?.setBankMode("edit");
    context?.setBankId(id);
  };

  return (
    <div className="group relative border border-dashed border-[rgba(0,0,0,0.2)] addressBox w-full  bg-[#fafafa] p-4 rounded-md cursor-pointer">
      {/* <span className="inline-block p-1 bg-[#e7e7e7] text-[12px] rounded-sm">{props?.bank?.bankType}</span> */}

      <h4 className="pt-2 flex items-center gap-4 text-[14px]">
        <span>{context?.userData?.name} </span>
        {/* <span>+{props?.bank?.mobile}</span> */}
        {console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",context?.userData?.name)}
      </h4>

      <span className="pt-0 text-[13px] block w-100">
        {props?.bank?.fullName +
          " " +
          props?.bank?.accountNo +
          " " +
          props?.bank?.IFSC +
          " " +
          props?.bank?.Branch +
          " " +
          props?.bank?.bankname}
      </span>

      <div className="absolute top-[20px] right-[20px]">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <HiOutlineDotsVertical />
        </IconButton>

        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            },
          }}
        >
          <MenuItem onClick={() => editBank(props?.bank?._id)}>{t("bankBox.edit")}</MenuItem>
          <MenuItem onClick={() => removeBank(props?.bank?._id)}>
            {t("bankBox.delete")}
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default BankBox;
