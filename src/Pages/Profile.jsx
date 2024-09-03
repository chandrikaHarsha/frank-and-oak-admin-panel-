import React, { useState, useContext } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavToggle } from "../Context/Context";
import { ImPinterest2 } from "react-icons/im";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Profile() {
  const [show, setShow] = useState(false);
  const [ifOtp, setIfOtp] = useState(false);
  const [timer, setTimer] = useState("Generate OTP");
  let { cookieData, setCookieData } = useContext(NavToggle);
  const [imgPreview, setImgPreview] = useState({});
  let navigate = useNavigate();
  console.log(cookieData);

  // const handleAdminData = () => {
  //   console.log("profile", cookieData);
  // };

  const handleGenerateOTP = async () => {
    setIfOtp(true);
    let timer = 30;
    let interval = setInterval(() => {
      --timer;
      setTimer(`Regenerate OTP After ${timer}s`);
      if (timer <= 0) {
        clearInterval(interval);
        setTimer("Generate OTP");
        setIfOtp(false);
      }
    }, 1000);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin-panel/admin/generate-otp",
        cookieData
      );
      if (response.status !== 200) {
        return alert("Something went wrong.");
      }
      alert("OTP has sent on your email.");
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmail = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/admin-panel/admin/update-email/${cookieData._id}`,
        cookieData
      );
      console.log(response);
      if (response.status !== 200) return alert("something went wrong.");
      alert("email updated");
      Cookies.remove("admin");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Try after some time");
    }
  };

  const handleImagePreview = (e) => {
    let fileUrl;
    let name = e.target.name;
    // let value = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      fileUrl = this.result;
      setImgPreview({ ...imgPreview, [name]: fileUrl });
      setCookieData({ ...cookieData, ...imgPreview });

      // console.log("name: ", name, "result: ",e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // useEffect(() => {
  //   handleAdminData();
  //   updateEmail();
  // }, [cookieData]);
  const handleProfileInput = (e) => {
    let fileUrl;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "profileImg";
    fileInput.click();
    const reader = new FileReader();
    fileInput.addEventListener("change", (e) => {
      reader.onload = function () {
        fileUrl = this.result;
        setImgPreview({ ...imgPreview, profileImg: fileUrl });
        setCookieData({ ...cookieData, ...imgPreview });
      };
      reader.readAsDataURL(e.target.files[0]);
    });
  };
  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/admin-panel/admin/update-admin-profile/${cookieData._id}`,
        cookieData
      );
      if (response !== 200) return alert("something went wrong");
      alert('updated.')
    } catch (error) {
      alert('Error occurred')
      console.log(error);
    }
  };
  return (
    <div>
      <div className="w-[90%] mx-auto mt-[140px] mb-[20px] bg-white border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Profile
        </span>
        <div className="w-full grid grid-cols-[2fr_2fr]">
          <div className="p-[10px]">
            <form onSubmit={handleProfileUpdate}>
              <div className="w-full ">
                <span className="block m-[15px_0]">Name</span>
                <input
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setCookieData({ ...cookieData, name: e.target.value })
                  }
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
              </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Social Link</span>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <RiFacebookFill />
                  </span>
                  <input
                    type="text"
                    name="fb"
                    onChange={(e) =>
                      setCookieData({ ...cookieData, fb: e.target.value })
                    }
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <CiInstagram />
                  </span>
                  <input
                    type="text"
                    name="instagram"
                    onChange={(e) =>
                      setCookieData({
                        ...cookieData,
                        instagram: e.target.value,
                      })
                    }
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaYoutube />
                  </span>
                  <input
                    type="text"
                    name="youtube"
                    onChange={(e) =>
                      setCookieData({ ...cookieData, youtube: e.target.value })
                    }
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaXTwitter />
                  </span>
                  <input
                    type="text"
                    name="twitter"
                    onChange={(e) =>
                      setCookieData({ ...cookieData, twitter: e.target.value })
                    }
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <ImPinterest2 />
                  </span>
                  <input
                    type="text"
                    name="pinterest"
                    onChange={(e) =>
                      setCookieData({ ...cookieData, twitter: e.target.value })
                    }
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={imgPreview.logo}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="logo"
                  onChange={handleImagePreview}
                  className="input border w-full m-[10px_0] category"
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Fav Icon</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={imgPreview.favicon}
                    alt="favicon"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="favicon"
                  onChange={handleImagePreview}
                  className="input border w-full m-[10px_0] category"
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Footer Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={imgPreview.footer_icon}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="footer_icon"
                  onChange={handleImagePreview}
                  className="input border w-full m-[10px_0] category"
                />
              </div>
              <div className="w-full my-[20px] relative ">
                <span className="block m-[15px_0]">Password</span>
                <input
                  type={show === false ? "password" : "text"}
                  name="password"
                  onChange={(e) =>
                    setCookieData({ ...cookieData, password: e.target.value })
                  }
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                >
                  {show === false ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button className="w-[150px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]">
                Update
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center p-[10px] box-border items-center gap-[10px] h-[400px]">
            <div className="border border-slate-300 w-[200px] h-[200px] rounded-[50%] object-contain">
              <img
                src={
                  imgPreview.profileImg === undefined
                    ? "/profile.jpg"
                    : `${imgPreview.profileImg}`
                }
                alt="profile img"
                className="w-full h-full rounded-[50%] cursor-pointer"
                onClick={handleProfileInput}
              />
            </div>
            <span className="block text-center">Profile Image</span>
          </div>
        </div>
      </div>
      <div className="mb-[80px] w-[90%] mx-auto border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Update Email
        </span>
        <div className="w-full p-[30px]">
          <form method="post">
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                type="email"
                name="current_email"
                defaultValue={cookieData.email}
                onChange={(e) =>
                  setCookieData({ ...cookieData, email: e.target.value })
                }
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <div className={ifOtp ? "w-full mb-[10px]" : "hidden"}>
              <span className="block m-[15px_0]">New Email</span>
              <input
                type="email"
                name="new_email"
                placeholder="New Email"
                onChange={(e) =>
                  setCookieData({ ...cookieData, new_email: e.target.value })
                }
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <div className={ifOtp === false ? "hidden" : "w-full mb-[10px]"}>
              <span className="block m-[15px_0]">OTP</span>
              <input
                type="text"
                placeholder="Enter OTP"
                name="otp"
                onChange={(e) =>
                  setCookieData({ ...cookieData, otp: e.target.value })
                }
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <button
              type="button"
              disabled={ifOtp}
              onClick={handleGenerateOTP}
              className={`w-[200px] h-[40px] rounded-md text-white ${
                ifOtp === true
                  ? "bg-slate-500 cursor-not-allowed"
                  : "bg-[#5351c9]"
              } my-[30px] mr-[50px]`}
            >
              {timer}
            </button>

            <button
              type="button"
              className={
                ifOtp
                  ? "w-[200px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]"
                  : "hidden"
              }
              onClick={updateEmail}
            >
              Update Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
