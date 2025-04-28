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
import { toast } from 'react-toastify';

const Products = () => {
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
  
        deleteData(`/api/product/${id}`).then((res) => {
          
            getProducts();
            toast.success('Product deleted successfully!')
        })
        .catch((err)=>console.log(err));
    
}

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
}

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {    
    getProducts()
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
                <h2 className="pb-0">Product Inventory</h2>
                <Button className="!ml-auto !font-bold" onClick={() => router.push("/product-inventory/add-product")}>
                  Add Product
                </Button>
              </div>
              <p className="mt-0 mb-0">
                There are{" "}
                <span className="font-bold text-primary">
                  {products?.length}
                </span>{" "}
                products
              </p>

              <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Sub Category
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Sales
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Verified?
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Action
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
                          <td className="px-6 py-4 font-[500]">
                            {product?.name}
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {product?.catName}
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {product?.subCat || "N/A"}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            {product?.price?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            {product?.sale || 0}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            {product?.countInStock}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            {product?.rating}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            {product?.isVerified?'Yes':'No'}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <Button
                              className="!bg-[#f1f1f1] !text-black"
                              onClick={() => handleEdit(product?._id)} // Replace with your action handler
                            >
                              Edit
                            </Button>
                            <Button
                              className="!bg-red-600 !text-white !ml-2"
                              onClick={() => deleteProduct(product?._id)} // Replace with your delete handler
                            >
                              Delete
                            </Button>
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

export default Products;
