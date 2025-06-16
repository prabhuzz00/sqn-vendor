"use client";
import Head from "next/head";
import React from "react";
import { useTranslation } from "@/utils/useTranslation";

const Pricing = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("pricing.title")} | Soouqna</title>
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {t("pricing.title")}
        </h1>
        <p className="text-lg mb-8 text-center text-gray-600">
          {t("pricing.intro")}
        </p>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("pricing.commissionTitle")}
          </h2>
          <p className="text-gray-700">{t("pricing.commissionDesc")}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("pricing.payoutTitle")}
          </h2>
          <p className="text-gray-700">{t("pricing.payoutDesc")}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t("pricing.feesTitle")}
          </h2>
          <p className="text-gray-700">{t("pricing.feesDesc")}</p>
        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          {t("pricing.contactNote")}{" "}
          <a href="/contact" className="underline">
            {t("pricing.contactLink")}
          </a>
          .
        </p>
      </main>
    </>
  );
};

export default Pricing;
