import Head from "next/head";
import React from "react";

const Pricing = () => {
  return (
    <>
      <Head>
        <title>Vendor Pricing & Commission | Soouqna</title>
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Vendor Pricing & Commission
        </h1>
        <p className="text-lg mb-8 text-center text-gray-600">
          Welcome to Soouqna! Here&apos;s how our pricing and commission
          structure works for our valued vendors.
        </p>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Commission Structure</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              📦 <strong>General Products:</strong> 10% commission per sale
            </li>
            <li>
              🧴 <strong>Beauty & Personal Care:</strong> 12% commission
            </li>
            <li>
              👕 <strong>Fashion & Accessories:</strong> 15% commission
            </li>
            <li>
              💎 <strong>Luxury or High-End Items:</strong> 18% commission
            </li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Payout Terms</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Payments are processed every 14 days</li>
            <li>🏦 Minimum withdrawal amount: $50</li>
            <li>📄 All payouts are made via bank transfer</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">No Monthly Fees</h2>
          <p className="text-gray-700">
            We believe in supporting small and growing businesses. That’s why we
            charge <strong>no setup fees</strong> or monthly subscription fees.
            You only pay when you make a sale!
          </p>
        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          Have questions?{" "}
          <a href="/contact" className="underline">
            Contact our vendor support
          </a>
          .
        </p>
      </main>
    </>
  );
};

export default Pricing;
