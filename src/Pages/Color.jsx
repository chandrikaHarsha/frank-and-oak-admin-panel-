import React from "react";
// import ColorPicker from "@rc-component/color-picker";
// import "@rc-component/color-picker/assets/index.css";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
function Color() {
  let [color, setColor] = useColor("#651ecb");
  return (
    <div className="w-[90%] bg-white mx-auto rounded-[10px] border my-[150px]">
      <div className="bg-[#f8f8f9] h-[50px] header w-full p-[12px] rounded-[10px_10px_0_0]">
        Add Colors
      </div>
      <div className="w-full p-[20px]">
        <label htmlFor="color">Color Name</label> <br />
        <input
          type="text"
          name="color"
          id="color"
          className="w-full p-[10px] focus:outline-none border my-[5px] rounded-[5px]"
          placeholder="Color Name"
        />
        <span className="my-[10px]">Color picker</span>
        <div className="w-[300px] m-[20px] ">
          <ColorPicker color={color} onChange={setColor} height={200} />
        </div>
        <button className="bg-[#5351C9] text-white rounded-[5px]  w-[120px] h-[40px]">
          Select Color
        </button>
      </div>
    </div>
  );
}

export default Color;
