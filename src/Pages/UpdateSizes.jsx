import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSizes = () => {
  const [size, setSize] = useState({});
  const { _id } = useParams();
  let navigate = useNavigate();

  const handleSizeFetchAPI = async () => {
    await axios
      .get(`http://localhost:4000/api/admin-panel/size/read-size-by-id/${_id}`)
      .then((res) => {
        if (res.status === 200) setSize(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log(size);
    await axios
      .put(
        `http://localhost:4000/api/admin-panel/size/update-size/${_id}`,
        size
      )
      .then((res) => {
        if (res.status === 200) alert("Size Updated Successfully.");
        navigate("/dashboard/size/view-sizes");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };
  useEffect(() => {
    handleSizeFetchAPI();
  }, []);
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[20px] font-bold p-[8px_16px] text-[#303640] border-b rounded-[10px_10px_0_0]">
        Update Size
      </span>
      <div className="w-[95%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleUpdate}>
          <div>
            <label htmlFor="size" className="block text-[#252b36f2]">
              Size Name
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={size.size}
              onChange={(e) => {
                setSize({ ...size, size: e.target.value });
              }}
              placeholder="Size Name"
              className="input p-2 border my-[20px] w-full rounded-[5px]"
            />
            <div className="w-full my-[10px] ">
              <label htmlFor="size" className="text-[#252b36f2] block">
                Size Order
              </label>
              <input
                type="text"
                name="sizeOrder"
                value={size.sizeOrder}
                onChange={(e) => {
                  setSize({ ...size, sizeOrder: e.target.value });
                }}
                id="updated_size_order"
                placeholder="Size Order"
                className="w-full input rounded-[5px] p-2 border my-[10px]"
              />
            </div>
          </div>

          <div className="w-full my-[30px]">
            <button className="w-[100px] rounded-[10px] bg-[#5351c9] border-none cursor-pointer text-white h-[30px]">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSizes;
