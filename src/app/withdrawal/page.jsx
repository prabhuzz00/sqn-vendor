"use client";
import React, { useEffect, useState } from "react";
import AccountSidebar from "@/components/AccountSidebar";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "@/components/Badge";
import { FaAngleUp } from "react-icons/fa6";
import { deleteData, fetchDataFromApi } from "@/utils/api";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Withdrawal = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`)
      .then((res) => {
        getProducts();
        toast.success("Product deleted successfully!");
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (productId) => {
    router.push(`/product-inventory/edit-product/${productId}`);
  };

  const getProducts = () => {
    const vendorId = localStorage.getItem("vendorId");
    fetchDataFromApi(
      `/api/product/getAllProductsForVendorId?vendorId=${vendorId}&page=${
        page + 1
      }&limit=${20}`
    ).then((res) => {
      console.log("res my products : ", res);
      if (!res?.error) {
        setProducts(res?.products);
      }
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <section className="py-5 lg:py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="col1 w-[20%] hidden lg:block">
          <AccountSidebar />
        </div>

        <div className="col2 w-full lg:w-[80%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-5 px-5 border-b border-[rgba(0,0,0,0.1)]">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">Withdrawals</h2>
                <Button
                  className="!ml-auto !font-bold"
                  onClick={() => router.push("/withdrawal/withdraw-request")}
                >
                  Withdraw Request
                </Button>
              </div>
              <p className="mt-0 mb-0">
                There are{" "}
                <span className="font-bold text-primary">
                  {products?.length}
                </span>{" "}
                withdrawal requests
              </p>

              <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Slno.
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Transaction id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Date of withdrawal
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.length !== 0 &&
                      products?.map((product, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-6 py-4 font-[500]">{index + 1}</td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {product?.transactionId}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            {product?.amount?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {new Date(
                              product?.withdrawalDate
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            {product?.status}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {products?.totalPages > 1 && (
                <div className="flex items-center justify-center mt-10">
                  <Pagination
                    showFirstButton
                    showLastButton
                    count={products?.totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Withdrawal;
