import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateColor = () => {
  const { _id } = useParams();
  const [color, setColor] = useState({});
  const navigate = useNavigate();
  const setImage = () => {
    let imageFileInput = document.querySelector("#image_src");
    let imagePreview = document.querySelector("#image_preview");
    let colorCode = document.querySelector("#color_code");
    let color_picker = document.querySelector("#color_picker");
    imageFileInput.addEventListener("change", function () {
      const file = this.files[0];
      console.log(file);
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.src = this.result;
      });
      reader.readAsDataURL(file);

      const colorPicker = new window.EyeDropper();
      const colorSelector = document.querySelector("#colorPicker");
      colorSelector.addEventListener("click", () => {
        colorPicker
          .open()
          .then((res) => {
            colorCode.value = res.sRGBHex;
            color_picker.value = res.sRGBHex;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  const handleFetchColorAPI = async () => {
    await axios
      .get(
        `http://localhost:4000/api/admin-panel/color/read-color-by-id/${_id}`
      )
      .then((res) => {
        if (res.status === 200) setColor(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("error occurred.");
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `http://localhost:4000/api/admin-panel/color/update-color/${_id}`,
        color
      )
      .then((res) => {
        if (res.status === 200) navigate("/dashboard/color/view-colors");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  useEffect(() => {
    handleFetchColorAPI();
  }, []);

  return (
    <div className="w-[90%] bg-white mx-auto rounded-[10px] border my-[150px]">
      <div className="bg-[#f8f8f9] h-[50px] header w-full p-[12px] rounded-[10px_10px_0_0]">
        Update Colors
      </div>
      <div className="w-full p-[20px]">
        <form method="post" onSubmit={handleUpdate}>
          <label htmlFor="color">Color Name</label> <br />
          <input
            type="text"
            name="color"
            id="color"
            value={color.color}
            onChange={(e) => setColor({ ...color, color: e.target.value })}
            className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
            placeholder="Color Name"
          />
          <label htmlFor="color_code">Color Code</label> <br />
          <input
            type="text"
            name="colorCode"
            value={color.colorCode}
            onChange={(e) => setColor({ ...color, colorCode: e.target.value })}
            id="color_code"
            className="w-full p-[10px] focus:outline-none border my-[10px] rounded-[5px]"
            placeholder="Color Code"
          />
          <label htmlFor="color">Color Picker</label> <br />
          <input
            type="color"
            name="color_picker"
            id="color_picker"
            className="focus:outline-none border my-[10px] rounded-[5px]"
          />
          <div className="w-[300px] my-[10px]">
            {/* <ColorPicker color={color} onChange={setColor} height={200} /> */}
            <span className="w-full h-[200px] object-contain my-[10px]">
              <img
                src=""
                alt="Select product"
                id="image_preview"
                width={300}
                height={200}
              />
            </span>
            <input
              type="file"
              name="image"
              id="image_src"
              className="category w-full border input rounded-[5px]"
              onClick={() => setImage()}
            />
            <span
              id="colorPicker"
              className="w-[100px] bg-[#5351c9] text-white cursor-pointer h-[30px] text-center rounded-[5px] box-border my-[30px] block border"
            >
              Pick Color
            </span>
          </div>
          <button className="bg-[#5351C9] text-white rounded-[5px]  w-[120px] h-[40px]">
            Update Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateColor;
