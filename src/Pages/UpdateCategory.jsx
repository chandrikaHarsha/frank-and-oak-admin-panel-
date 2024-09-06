import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const [category, setCategory] = useState({});
  const { _id } = useParams();
  const navigate = useNavigate();
  const handleCategoryFetch = async () => {
    if (!_id) return navigate("/dashboard/category/view-category");
    await axios
      .get(
        `http://localhost:4000/api/admin-panel/parent-category/update-parent-category-by-id/${_id}`
      )
      .then((res) => {
        // console.log(res);
        if (res.status !== 200) return alert("Something isn't Ok.");
        setCategory(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };
  useEffect(() => {
    handleCategoryFetch();
  }, []);

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              value={category.name}
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>

          <div className="w-full my-[10px]">
            <span className="block text-[#303640]">Category Description</span>
            <textarea
              name="description"
              value={category.description}
              className="input border w-full rounded-[5px] my-[10px] p-2"
              placeholder="Description"
            />
          </div>
          {/* <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="categoryStatus"
              id="categoryStatus"
              value="0"
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value="1"
              checked
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div> */}
          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[200px] h-[35px]">
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
