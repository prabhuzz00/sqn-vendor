"use client";
import React, { useState, useEffect, useContext } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { MyContext } from "@/context/ThemeProvider";
import TextField from "@mui/material/TextField";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "react-international-phone/style.css";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { editData, fetchDataFromApi, postData } from "@/utils/api";

const AddBank = () => {
  // const [phone, setPhone] = useState("");
  // const [addressType, setAddressType] = useState("");

  const [formFields, setFormsFields] = useState({
    fullName: "",
    accountNo: "",
    IFSC: "",
    Branch: "",
    bankname: "",
    vendorId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.userData?._id !== undefined) {
      setFormsFields((prevState) => ({
        ...prevState,
        vendorId: context?.userData?._id,
      }));
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  //   const handleChangeAddressType = (event) => {
  //     setAddressType(event.target.value);
  //     setFormsFields(() => ({
  //       ...formFields,
  //       addressType: event.target.value,
  //     }));
  //   };

  useEffect(() => {
    if (context?.bankMode === "edit") {
      fetchBank(context?.bankId);
    }
  }, [context?.bankMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.fullName === "") {
      context.alertBox("error", "Please enter Full Name as per bank");
      return false;
    }

    if (formFields.accountNo === "") {
      context.alertBox("error", "Please enter Your Account Number");
      return false;
    }

    if (formFields.IFSC === "") {
      context.alertBox("error", "Please enter your IFSC");
      return false;
    }

    if (formFields.Branch === "") {
      context.alertBox("error", "Please enter your Branch Name");
      return false;
    }

    if (formFields.bankname === "") {
      context.alertBox("error", "Please enter your bankname");
      return false;
    }

    // if (phone === "" || phone?.length < 5) {
    //   context.alertBox("error", "Please enter your 10 digit mobile number a");
    //   return false;
    // }

    // if (formFields.landmark === "") {
    //   context.alertBox("error", "Please enter landmark");
    //   return false;
    // }

    // if (formFields.addressType === "") {
    //   context.alertBox("error", "Please select address type");
    //   return false;
    // }

    if (context?.bankMode === "add") {
      setIsLoading(true);
      postData(`/api/bank/add`, formFields, { withCredentials: true }).then(
        (res) => {
          console.log(res);
          if (res?.error !== true) {
            context.alertBox("success", res?.message);
            setTimeout(() => {
              context.setOpenBankPanel(false);
              setIsLoading(false);
            }, 500);

            context.getUserDetails();

            setFormsFields({
              fullName: "",
              accountNo: "",
              IFSC: "",
              Branch: "",
              bankname: "",
              vendorId: "",
            });

            // setAddressType("");
            // setPhone("");
          } else {
            context.alertBox("error", res?.message);
            setIsLoading(false);
          }
        }
      );
    }

    if (context?.bankMode === "edit") {
      setIsLoading(true);
      editData(`/api/bank/${context?.bankId}`, formFields, {
        withCredentials: true,
      }).then((res) => {
        fetchDataFromApi(
          `/api/bank/get?vendorId=${context?.userData?._id}`
        ).then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            context.setOpenBankPanel(false);
          }, 500);
          context?.getUserDetails(res.data);

          setFormsFields({
            fullName: "",
            accountNo: "",
            IFSC: "",
            Branch: "",
            bankname: "",
            vendorId: "",
          });
        });
      });
    }
  };

  const fetchBank = (id) => {
    fetchDataFromApi(`/api/bank/${id}`).then((res) => {
      setFormsFields({
        fullName: res?.bank?.fullName,
        accountNo: res?.bank?.accountNo,
        IFSC: res?.bank?.IFSC,
        Branch: res?.bank?.Branch,
        bankname: res?.bank?.bankname,
        vendorId: res?.bank?.vendorId,
      });
    });
  };

  return (
    <form className="p-8 py-3 pb-8 px-4" onSubmit={handleSubmit}>
      <div className="col w-[100%] mb-4">
        <TextField
          className="w-full"
          label="Full name"
          variant="outlined"
          size="small"
          name="fullName"
          onChange={onChangeInput}
          value={formFields.fullName}
        />
      </div>

      <div className="col w-[100%] mb-4">
        <TextField
          className="w-full"
          label="Account Number"
          variant="outlined"
          size="small"
          name="accountNo"
          onChange={onChangeInput}
          value={formFields.accountNo}
        />
      </div>

      <div className="col w-[100%] mb-4">
        <TextField
          className="w-full"
          label="IFSC"
          variant="outlined"
          size="small"
          name="IFSC"
          onChange={onChangeInput}
          value={formFields.IFSC}
        />
      </div>

      <div className="col w-[100%] mb-4">
        <TextField
          className="w-full"
          label="Branch Name"
          variant="outlined"
          size="small"
          name="Branch"
          onChange={onChangeInput}
          value={formFields.Branch}
        />
      </div>

      <div className="col w-[100%] mb-4">
        <TextField
          className="w-full"
          label="Bank Name"
          variant="outlined"
          size="small"
          name="bankname"
          onChange={onChangeInput}
          value={formFields.bankname}
        />
      </div>

      {/* <div className="col w-[100%] mb-4">
        <PhoneInput
          defaultCountry="in"
          value={phone}
          onChange={(phone) => {
            setPhone(phone);
            setFormsFields((prevState) => ({
              ...prevState,
              mobile: phone,
            }));
          }}
        />
      </div> */}

      {/* <div className="col w-[100%] mb-4">
        <TextField
          className="w-full"
          label="Landmark"
          variant="outlined"
          size="small"
          name="landmark"
          onChange={onChangeInput}
          value={formFields.landmark}
        />
      </div> */}

      {/* <div className="flex gap-5 pb-5 flex-col">
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Address Type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            className="flex items-center gap-5"
            value={addressType}
            onChange={handleChangeAddressType}
          >
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
            <FormControlLabel
              value="Office"
              control={<Radio />}
              label="Office"
            />
          </RadioGroup>
        </FormControl>
      </div> */}

      <div className="flex items-center gap-5">
        <Button
          type="submit"
          className="btn-org btn-lg w-full flex gap-2 items-center"
        >
          {isLoading === true ? <CircularProgress color="inherit" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddBank;
