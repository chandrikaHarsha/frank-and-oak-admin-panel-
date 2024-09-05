import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddSizes = () => {
  const navigate = useNavigate();
  const handleSize = async (e) => {
    e.preventDefault();
    const size = e.target.size.value;
    const sizeOrder = e.target.sizeOrder.value;
    const status = e.target.status.value;
    await axios
      .post("http://localhost:4000/api/admin-panel/size/insert-size", {
        size: size,
        sizeOrder: sizeOrder,
        status: status,
      })
      .then((res) => {
        console.log(res);
        if (res.status !== 200) return alert("something is not ok.");
        alert("Inserted.");
        navigate("/dashboard/size/view-sizes");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };
  return (
    <div className="w-[90%] my-[150px] mx-auto bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] h-[50px] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[25px] font-[700] text-[#303640]">
        Add Size
      </span>
      <form method="post" onSubmit={handleSize}>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Name
          </label>
          <input
            type="text"
            name="size"
            id="size"
            placeholder="Size Name"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size_order" className="text-[#252b36f2]">
            Size Order
          </label>
          <input
            type="text"
            name="sizeOrder"
            id="size_order"
            placeholder="Size Order"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
            Display
          </label>
          <input
            type="radio"
            name="status"
            id="status"
            value={true}
            className="my-[10px] mx-[20px] accent-[#5351c9]"
          />
          <span>Display</span>
          <input
            type="radio"
            name="status"
            id="status"
            value={false}
            className="my-[10px] mx-[20px] accent-[#5351c9]"
          />
          <span>Hide</span>
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
            Add Size
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSizes;
