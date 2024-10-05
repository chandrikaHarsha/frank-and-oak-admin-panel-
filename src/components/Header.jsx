import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { RxHamburgerMenu } from "react-icons/rx";
import {
  // IoMailOpenOutline,
  IoMenuOutline,
  // IoDocumentOutline,
} from "react-icons/io5";
import { NavToggle } from "../Context/Context";
// import { GoBell } from "react-icons/go";
// import { GoChecklist } from "react-icons/go";
import { SlUser } from "react-icons/sl";
// import { RxGear } from "react-icons/rx";
// import { MdOutlinePayment } from "react-icons/md";
import { CiChat1, CiLock } from "react-icons/ci";
import Cookies from "js-cookie";
function Header() {
  let { navVisible, setNavVisibility, setCookieData } = useContext(NavToggle);
  let [width, setWidth] = useState(false);
  let [profileDropDown, setProfileDropDown] = useState(false);

  // console.log(navVisible);

  const navigate = useNavigate();
  const ifLoggedIn = () => {
    const check = Cookies.get("admin");
    if (!check) return navigate("/login");
    const adminData = JSON.parse(check);
    // console.log("......", adminData);
    setCookieData(adminData[0]);
  };

  const handleLogOut = () => {
    Cookies.remove("admin");
    navigate("/login");
  };
  useEffect(() => {
    ifLoggedIn();
  }, []);
  return (
    <div
      className={
        width === false
          ? "w-[80%] bg-white flex justify-between h-[60px] header py-[10px] px-[30px] fixed top-0 z-50"
          : "w-full bg-white flex justify-between h-[60px] header py-[10px] px-[30px] fixed top-0 z-50"
      }
    >
      <span className="my-[5px] text-[25px] w-[200px]  flex gap-[20px]">
        <IoMenuOutline
          className="cursor-pointer"
          onClick={() => {
            setNavVisibility(!navVisible);
            setWidth(!width);
          }}
        />
        <span className="text-[16px] font-extralight text-[#303640]">
          Dashboard
        </span>
      </span>
      <span
        className="object-contain relative cursor-pointer"
        onClick={() => setProfileDropDown(!profileDropDown)}
      >
        <img
          src="/profile.jpg"
          alt="profile"
          width={40}
          height={40}
          className="rounded-[50%]"
        />
        <div
          className={
            profileDropDown === false
              ? "hidden"
              : "w-[180px] absolute top-[45px] -z-50 rounded-[5px] bg-white border right-[0px] profileBox"
          }
        >
          {/* <ul className="list-none w-full ">
            <span className="block bg-[#f8f8f9] text-[#6d7d9c] text-[14px] font-semibold border-b rounded-[10px_10px_0_0] p-[8px_16px]">
              Account
            </span>
            <li className="w-full grid grid-cols-[20px_auto_30px] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
              <span className="p-[7px_1px]">
                <GoBell />{" "}
              </span>
              <span>Updates</span>
              <span className="w-[30px] rounded-md text-white bg-blue-400 p-[2px_7px]">
                20
              </span>
            </li>
            <li className="w-full grid grid-cols-[20px_auto_30px] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
              <span className="p-[7px_1px]">
                <IoMailOpenOutline />{" "}
              </span>
              <span>Messages</span>
              <span className="w-[30px] rounded-md text-white bg-green-400 p-[2px_7px]">
                50
              </span>
            </li>
            <li className="w-full grid grid-cols-[20px_auto_30px] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
              <span className="p-[7px_1px]">
                <GoChecklist />{" "}
              </span>
              <span>Tasks</span>
              <span className="w-[30px] rounded-md text-white bg-red-400 p-[2px_7px]">
                10
              </span>
            </li>
            <li className="w-full grid grid-cols-[20px_auto_30px] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
              <span className="p-[7px_1px]">
                <CiChat1 />{" "}
              </span>
              <span>Comments</span>
              <span className="w-[30px] rounded-md text-white bg-yellow-400 p-[2px_7px]">
                80
              </span>
            </li>
          </ul> */}
          <ul className="list-none w-full ">
            {/* <span className="block bg-[#f8f8f9] text-[#6d7d9c] text-[14px] font-semibold border-b rounded-[10px_10px_0_0] p-[8px_16px]">
              Settings
            </span> */}
            <Link to="/dashboard/profile">
              <li className="w-full grid grid-cols-[20px_auto] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
                <span className="p-[7px_1px]">
                  <SlUser />{" "}
                </span>
                <span>Profile</span>
              </li>
            </Link>
            {/* <li className="w-full grid grid-cols-[20px_auto_30px] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
              <span className="p-[7px_1px]">
                <RxGear />{" "}
              </span>
              <span>Settings</span>
            </li>
            <li className="w-full grid grid-cols-[20px_auto_30px] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
              <span className="p-[7px_1px]">
                <MdOutlinePayment />{" "}
              </span>
              <span>Payments</span>
              <span className="w-[30px] rounded-md text-white bg-slate-400 p-[2px_7px]">
                10
              </span>
            </li>
            <li className="w-full grid grid-cols-[20px_auto_30px] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
              <span className="p-[7px_1px]">
                <IoDocumentOutline />{" "}
              </span>
              <span>Projects</span>
              <span className="w-[30px] rounded-md text-white bg-purple-700 p-[2px_7px]">
                10
              </span>
            </li> */}
            <Link to="/login">
              <li className="w-full box-border grid grid-cols-[30px_auto] gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
                <span className="p-[7px_1px]">
                  <CiLock />{" "}
                </span>
                <span onClick={handleLogOut}>Lock Account</span>
              </li>
            </Link>
          </ul>
        </div>
      </span>
    </div>
  );
}

export default Header;
