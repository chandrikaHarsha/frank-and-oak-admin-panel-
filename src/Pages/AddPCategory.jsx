import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPCategory = () => {
  const [activeParentCategories, setActiveParentCategories] = useState([]);
  const [src, setSrc] = useState({});
  const navigate = useNavigate();
  const handleActiveParentCategories = async () => {
    await axios
      .get(
        "http://localhost:4000/api/admin-panel/parent-category/read-active-parent-categories"
      )
      .then((res) => {
        if (res.status === 200) setActiveParentCategories(res.data.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
        alert("Error Occurred.");
      });
  };

  const fileInputReader = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const fileUrl = this.result;
      setSrc({ filename: fileUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleProductCategory = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:4000/api/admin-panel/product-category/add-product-category",
        e.target
      )
      .then((res) => {
        if (res.status !== 200) return alert("Something is not ok");
        alert(res.data.message);
        navigate("/dashboard/products/view-category");
      })
      .catch((error) => {
        console.log(error);
        alert("error occurred.");
      });
  };

  useEffect(() => {
    handleActiveParentCategories();
  }, []);

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Add Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleProductCategory}>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="product_category_name"
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-[300px] object-contain border">
            <img src={src.filename} alt="product" width={300} height={300} />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="categoryImg"
              onChange={fileInputReader}
              className="input border w-full rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Parent Category Name
            </label>
            <select
              name="parent_category"
              id="parent_category"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            >
              <option value="default" selected disabled hidden>
                --Select Parent Category--
              </option>
              {activeParentCategories.map((v, i) => (
                <option value={v._id} key={i} className="cursor-pointer">
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={false}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[250px] h-[35px]">
              Add Product Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPCategory;
