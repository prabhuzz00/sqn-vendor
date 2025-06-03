// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import { MyContext } from "@/context/ThemeProvider";
// import TextField from "@mui/material/TextField";
// import "react-international-phone/style.css";
// import "react-international-phone/style.css";
// import { Button } from "@mui/material";
// import CircularProgress from "@mui/material/CircularProgress";
// import { editData, fetchDataFromApi, postData } from "@/utils/api";
// import { useTranslation } from "@/utils/useTranslation";

// const AddBank = () => {
//   const { t } = useTranslation();
//   const [formFields, setFormsFields] = useState({
//     fullName: "",
//     accountNo: "",
//     IFSC: "",
//     Branch: "",
//     bankname: "",
//     vendorId: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const context = useContext(MyContext);

//   useEffect(() => {
//     if (context?.userData?._id !== undefined) {
//       setFormsFields((prevState) => ({
//         ...prevState,
//         vendorId: context?.userData?._id,
//       }));
//     }
//   }, [context?.userData]);

//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setFormsFields(() => {
//       return {
//         ...formFields,
//         [name]: value,
//       };
//     });
//   };

//   useEffect(() => {
//     if (context?.bankMode === "edit") {
//       fetchBank(context?.bankId);
//     }
//   }, [context?.bankMode]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formFields.fullName === "") {
//       context.alertBox("error", t("bankForm.errors.fullName"));
//       return false;
//     }

//     if (formFields.accountNo === "") {
//       context.alertBox("error", t("bankForm.errors.accountNumber"));
//       return false;
//     }

//     if (formFields.IFSC === "") {
//       context.alertBox("error", t("bankForm.errors.ifsc"));
//       return false;
//     }

//     if (formFields.Branch === "") {
//       context.alertBox("error", t("bankForm.errors.branchName"));
//       return false;
//     }

//     if (formFields.bankname === "") {
//       context.alertBox("error", t("bankForm.errors.bankName"));
//       return false;
//     }

//     if (context?.bankMode === "add") {
//       setIsLoading(true);
//       postData(`/api/bank/add`, formFields, { withCredentials: true }).then(
//         (res) => {
//           console.log(res);
//           if (res?.error !== true) {
//             context.alertBox("success", res?.message);
//             setTimeout(() => {
//               context.setOpenBankPanel(false);
//               setIsLoading(false);
//             }, 500);

//             context.getUserDetails();

//             setFormsFields({
//               fullName: "",
//               accountNo: "",
//               IFSC: "",
//               Branch: "",
//               bankname: "",
//               vendorId: "",
//             });
//           } else {
//             context.alertBox("error", res?.message);
//             setIsLoading(false);
//           }
//         }
//       );
//     }

//     if (context?.bankMode === "edit") {
//       setIsLoading(true);
//       editData(`/api/bank/${context?.bankId}`, formFields, {
//         withCredentials: true,
//       }).then((res) => {
//         fetchDataFromApi(
//           `/api/bank/get?vendorId=${context?.userData?._id}`
//         ).then((res) => {
//           setTimeout(() => {
//             setIsLoading(false);
//             context.setOpenBankPanel(false);
//           }, 500);
//           context?.getUserDetails(res.data);

//           setFormsFields({
//             fullName: "",
//             accountNo: "",
//             IFSC: "",
//             Branch: "",
//             bankname: "",
//             vendorId: "",
//           });
//         });
//       });
//     }
//   };

//   const fetchBank = (id) => {
//     fetchDataFromApi(`/api/bank/${id}`).then((res) => {
//       setFormsFields({
//         fullName: res?.bank?.fullName,
//         accountNo: res?.bank?.accountNo,
//         IFSC: res?.bank?.IFSC,
//         Branch: res?.bank?.Branch,
//         bankname: res?.bank?.bankname,
//         vendorId: res?.bank?.vendorId,
//       });
//     });
//   };

//   return (
//     <form className="p-8 py-3 pb-8 px-4" onSubmit={handleSubmit}>
//       <div className="col w-[100%] mb-4">
//         <TextField
//           className="w-full"
//           label={t("bankForm.fullName")}
//           variant="outlined"
//           size="small"
//           name="fullName"
//           onChange={onChangeInput}
//           value={formFields.fullName}
//         />
//       </div>

//       <div className="col w-[100%] mb-4">
//         <TextField
//           className="w-full"
//           label={t("bankForm.accountNumber")}
//           variant="outlined"
//           size="small"
//           name="accountNo"
//           onChange={onChangeInput}
//           value={formFields.accountNo}
//         />
//       </div>

//       <div className="col w-[100%] mb-4">
//         <TextField
//           className="w-full"
//           label={t("bankForm.ifsc")}
//           variant="outlined"
//           size="small"
//           name="IFSC"
//           onChange={onChangeInput}
//           value={formFields.IFSC}
//         />
//       </div>

//       <div className="col w-[100%] mb-4">
//         <TextField
//           className="w-full"
//           label={t("bankForm.branchName")}
//           variant="outlined"
//           size="small"
//           name="Branch"
//           onChange={onChangeInput}
//           value={formFields.Branch}
//         />
//       </div>

//       <div className="col w-[100%] mb-4">
//         <TextField
//           className="w-full"
//           label={t("bankForm.bankName")}
//           variant="outlined"
//           size="small"
//           name="bankname"
//           onChange={onChangeInput}
//           value={formFields.bankname}
//         />
//       </div>

//       <div className="flex items-center gap-5">
//         <Button
//           type="submit"
//           className="btn-org btn-lg w-full flex gap-2 items-center"
//         >
//           {isLoading === true ? (
//             <CircularProgress color="inherit" />
//           ) : (
//             t("bankForm.save")
//           )}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default AddBank;

"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { MyContext } from "@/context/ThemeProvider";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import "react-international-phone/style.css";
import { editData, fetchDataFromApi, postData } from "@/utils/api";
import { useTranslation } from "@/utils/useTranslation";

const initialForm = {
  fullName: "",
  accountNo: "",
  IFSC: "",
  Branch: "",
  bankname: "",
  vendorId: "",
};

const AddBank = () => {
  const { t } = useTranslation();
  const [formFields, setFormsFields] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  /* ------------------------------------------------------------------ */
  /* Sync vendorId when user details arrive                              */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (context?.userData?._id) {
      setFormsFields((prev) => ({ ...prev, vendorId: context.userData._id }));
    }
  }, [context?.userData?._id]);

  /* ------------------------------------------------------------------ */
  /* Controlled inputs                                                   */
  /* ------------------------------------------------------------------ */
  const onChangeInput = ({ target: { name, value } }) =>
    setFormsFields((prev) => ({ ...prev, [name]: value }));

  /* ------------------------------------------------------------------ */
  /* Fetch single bank document when entering edit mode                  */
  /* ------------------------------------------------------------------ */
  const fetchBank = useCallback((id) => {
    if (!id) return;
    fetchDataFromApi(`/api/bank/${id}`).then((res) => {
      const b = res?.bank ?? {};
      setFormsFields({
        fullName: b.fullName ?? "",
        accountNo: b.accountNo ?? "",
        IFSC: b.IFSC ?? "",
        Branch: b.Branch ?? "",
        bankname: b.bankname ?? "",
        vendorId: b.vendorId ?? "",
      });
    });
  }, []);

  useEffect(() => {
    if (context?.bankMode === "edit") {
      fetchBank(context?.bankId);
    } else {
      setFormsFields(initialForm); // reset when we switch to “add”
    }
  }, [context?.bankMode, context?.bankId, fetchBank]);

  /* ------------------------------------------------------------------ */
  /* Submit handler                                                      */
  /* ------------------------------------------------------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();

    // quick client-side validation
    const required = {
      fullName: "bankForm.errors.fullName",
      accountNo: "bankForm.errors.accountNumber",
      IFSC: "bankForm.errors.ifsc",
      Branch: "bankForm.errors.branchName",
      bankname: "bankForm.errors.bankName",
    };
    for (const [field, msgKey] of Object.entries(required)) {
      if (!formFields[field]) {
        context.alertBox("error", t(msgKey));
        return;
      }
    }

    const save = async () => {
      setIsLoading(true);
      try {
        if (context?.bankMode === "add") {
          const res = await postData(`/api/bank/add`, formFields, {
            withCredentials: true,
          });
          if (res?.error) throw new Error(res.message);
        } else {
          await editData(`/api/bank/${context?.bankId}`, formFields, {
            withCredentials: true,
          });
        }

        context.alertBox("success", t("bankForm.saved"));
        await context.getUserDetails();
        setFormsFields(initialForm);
        context.setOpenBankPanel(false);
      } catch (err) {
        context.alertBox("error", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    save();
  };

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */
  return (
    <form className="p-8 py-3 pb-8 px-4" onSubmit={handleSubmit}>
      {[
        { name: "fullName", label: t("bankForm.fullName") },
        { name: "accountNo", label: t("bankForm.accountNumber") },
        { name: "IFSC", label: t("bankForm.ifsc") },
        { name: "Branch", label: t("bankForm.branchName") },
        { name: "bankname", label: t("bankForm.bankName") },
      ].map(({ name, label }) => (
        <div key={name} className="col w-full mb-4">
          <TextField
            className="w-full"
            label={label}
            variant="outlined"
            size="small"
            name={name}
            value={formFields[name]}
            onChange={onChangeInput}
          />
        </div>
      ))}

      <div className="flex items-center gap-5">
        <Button
          type="submit"
          className="btn-org btn-lg w-full flex gap-2 items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            t("bankForm.save")
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddBank;
