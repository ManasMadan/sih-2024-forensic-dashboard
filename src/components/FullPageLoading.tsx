"use client";
import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

export default function FullPageLoading() {
  return (
    <main className="w-full h-full grid place-items-center">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </main>
  );
}
