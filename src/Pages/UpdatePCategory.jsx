import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePCategory = () => {
  const [activeParentCategories, setActiveParentCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  const [src, setSrc] = useState({});
  const [productCategories, setProductCategories] = useState({});
  const { _id } = useParams();
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

  const fetchProductCategoryById = async () => {
    await axios
      .get(
        `http://localhost:4000/api/admin-panel/product-category/read-product-category-by-id/${_id}`
      )
      .then((res) => {
        if (res.status === 200) {
          setProductCategories(res.data.data);
          setThumbnail(res.data.filepath);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };

  const updateProductCategory = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `http://localhost:4000/api/admin-panel/product-category/update-product-category/${_id}`,
        e.target
      )
      .then((res) => {
        if (res.status === 200) alert(res.data.message);
        // console.log(res.data.data);
        navigate("/dashboard/products/view-category");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  useEffect(() => {
    handleActiveParentCategories();
    fetchProductCategoryById();
  }, []);
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Product Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={updateProductCategory}>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="product_category_name"
              value={productCategories.product_category_name}
              onChange={(e) =>
                setProductCategories({
                  ...productCategories,
                  product_category_name: e.target.value,
                })
              }
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-[300px] object-contain border">
            <img
              src={
                Object.keys(src).length === 0
                  ? `${thumbnail}${productCategories.thumbnail}`
                  : src.filename
              }
              alt="product"
              width={300}
              height={300}
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              onChange={(e) => {
                setProductCategories({
                  ...productCategories,
                  thumbnail: e.target.value,
                });
                fileInputReader(e);
              }}
              id="categoryImg"
              className="input border w-full rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Parent Category Name
            </label>
            <select
              name="parent_category"
              value={productCategories.parent_category}
              onChange={(e) =>
                setProductCategories({
                  ...productCategories,
                  parent_category: e.target.value,
                })
              }
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
              value={productCategories.description}
              onChange={(e) =>
                setProductCategories({
                  ...productCategories,
                  description: e.target.value,
                })
              }
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>

          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[200px] h-[35px]">
              update Product Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePCategory;
