"use client";
import React from "react";
import Link from "next/link";

export default function sellOnline() {
  return (
    <div className="container mx-0 p-6">
      <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-white to-pink-100 p-8 rounded-lg shadow-lg pr-0">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sell online to 14 Cr+ customers at{" "}
            <span className="text-purple-600">0% Commission</span>
          </h1>
          <p className="text-gray-600 mb-4">
            Become a Soqqna seller and grow your business across India
          </p>
          <p className="text-purple-600 mb-4">
            <span className="inline-block bg-purple-100 px-2 py-1 rounded">
              NEW
            </span>{" "}
            Do not have a TAX INFO? You can still sell on Soqqna.{" "}
            <a href="#" className="underline">
              Know more
            </a>
          </p>
          <Link href="/become-vendor">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
              Start Selling
            </button>
          </Link>
        </div>
        <div className="mt-6 md:mt-0">
          <img
            src="https://supplier.meesho.com/images/Desktop-Pic-new.png"
            alt="Man with boxes"
            className="max-w-full h-auto"
          />
        </div>
      </section>
      <section className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-bold text-pink-600">11 Lakh+</h2>
            <p className="text-gray-700">Trust Soqqna to sell online</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-bold text-pink-600">14 Crore+</h2>
            <p className="text-gray-700">Customers buying across India</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-bold text-pink-600">19000+</h2>
            <p className="text-gray-700">Pincode Supported for delivery</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-bold text-pink-600">700+</h2>
            <p className="text-gray-700">Categories to sell online</p>
          </div>
        </div>
      </section>

      <section className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">How it works</h2>
        <div className="flex items-center justify-between flex-col md:flex-row gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-semibold">Create Account</h3>
            <p className="text-gray-600">
              All you need is: <br />• GSTIN (for GST sellers) or Enrollment
              ID/UIN (for non-GST sellers) <br />• Bank Account
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-semibold">List Products</h3>
            <p className="text-gray-600">
              List the products you want to sell in your supplier panel
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-semibold">Get Orders</h3>
            <p className="text-gray-600">
              Start getting orders from crores of Indians actively shopping on
              our platform.
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">4</span>
            </div>
            <h3 className="font-semibold">Lowest Cost Shipping</h3>
            <p className="text-gray-600">
              Products are shipped to customers at lowest costs
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold">5</span>
            </div>
            <h3 className="font-semibold">Receive Payments</h3>
            <p className="text-gray-600">
              Payments are deposited directly to your bank account following a
              7-day payment cycle from order delivery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
