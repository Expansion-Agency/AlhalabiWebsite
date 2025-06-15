import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="shadow-md min-h-[17vh] bg-[#fdfdfd] pt-5">
      <hr className="lg:hidden mx-4 border-black/30" />
      <div className="bottom flex flex-col lg:flex-row-reverse lg:items-center justify-between p-5">
        <div className="flex items-center gap-3 mb-5 lg:mb-0 gupter-regular">
          <p className=" text-black/50"></p>
        </div>
        <hr className="lg:hidden border-black/30" />
        <div className="flex mx-auto py-7 lg:p-5 gap-2 gupter-medium">
          <p className="text-black/50"></p>
          <a href="">Instagram</a>
          <a href="">Facebook</a>
          <p>X</p>
          <a href="">Tiktok</a>
          <a href="">Snapchat</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
