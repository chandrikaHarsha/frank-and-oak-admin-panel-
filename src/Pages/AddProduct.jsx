import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState([]);
  const [activeProductCategories, setActiveProductCategories] = useState([]);
  const [ifCheckedSizes, setIfCheckedSizes] = useState([]);
  const [ifCheckedColors, setIfCheckedColors] = useState([]);

  const navigate = useNavigate();

  const handleSizeFetch = async () => {
    try {
      await axios
        .get("http://localhost:4000/api/admin-panel/size/read-size")
        .then((res) => {
          setSizes(res.data.data);
        });
    } catch (error) {
      console.log(error);
      alert("Error Occurred.");
    }
  };

  const handleColorFetchAPI = async () => {
    await axios
      .get("http://localhost:4000/api/admin-panel/color/read-color")
      .then((res) => {
        if (res.status === 200) setColor(res.data.data);
      })
      .catch((error) => {
        alert("Error Occurred.");
        console.log(error);
      });
  };

  const activeProductCategoriesAPI = async () => {
    await axios
      .get(
        "http://localhost:4000/api/admin-panel/product-category/active-product-categories"
      )
      .then((res) => {
        if (res.status === 200) setActiveProductCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleCheckedSizes = (e) => {
    if (e.target.checked) {
      setIfCheckedSizes((prev) => [...prev, e.target.value]);
    } else {
      setIfCheckedSizes((prev) => prev.filter((v) => v !== e.target.value));
    }
  };

  const handleCheckedColors = (e) => {
    if (e.target.checked) {
      setIfCheckedColors((prev) => [...prev, e.target.value]);
    } else {
      setIfCheckedColors((prev) => prev.filter((v) => v !== e.target.value));
    }
  };

  const AddProduct = async (e) => {
    e.preventDefault();
    const product = new FormData(e.target);
    // product.append("size", JSON.stringify(ifCheckedColors));
    // product.append("color", JSON.stringify(ifCheckedSizes));

    await axios
      .post(
        "http://localhost:4000/api/admin-panel/products/add-product",
        product
      )
      .then((res) => {
        if (res.status === 200) alert("Product Added");
        navigate("/dashboard/products/view-product");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };

  useEffect(() => {
    handleSizeFetch();
    handleColorFetchAPI();
    activeProductCategoriesAPI();
  }, []);
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={AddProduct}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="product_desc"
              name="description"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="product_short_desc"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="product_short_desc"
              name="short_description"
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
              type="file"
              id="product_img"
              name="thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="image_animation"
              name="hover_thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="product_gallery"
              name="images"
              multiple
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="product_price"
                name="price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="product_mrp"
                name="actual_price"
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          {/* <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <select
              id="parent_category"
              name="parent_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="default" selected disabled hidden>
                --Select Parent Category--
              </option>
              <option value="men" className="cursor-pointer">
                Men
              </option>
              <option value="women" className="cursor-pointer">
                Women
              </option>
            </select>
          </div> */}
          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <select
              id="product_category"
              name="product_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="default" selected disabled hidden>
                --Select Product Category--
              </option>
              {activeProductCategories.map((v, i) => (
                <option value={v._id} className="cursor-pointer" key={i}>
                  {v.product_category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="stock"
                id="stock"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Stock--
                </option>
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="w-full m-[30px_0]">
            <span className="block m-[10px_0] font-[400]">Sizes</span>
            <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-[20px]">
              {sizes.map((v, i) => (
                <div>
                  <label htmlFor="size" className="mr-[10px] text-[#303640]">
                    {v.size}
                  </label>
                  <input
                    type="checkbox"
                    name="size"
                    value={v._id}
                    onClick={handleCheckedSizes}
                    key={i}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full m-[30px_0]">
            <span className="block m-[10px_0] font-[400]">Colors</span>
            <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-[20px]">
              {color.map((v, i) => (
                <div>
                  <label htmlFor="color" className="mr-[10px] text-[#303640]">
                    {v.color}
                  </label>
                  <input
                    type="checkbox"
                    name="color"
                    value={v._id}
                    className="mx-[10px]"
                    onClick={handleCheckedColors}
                  />
                  <span
                    style={{
                      backgroundColor: v.colorCode,
                      boxShadow: "0 4px 12px #bbb",
                      padding: "5px",
                      boxSizing: "border-box",
                      width: "15px",
                      height: "15px",
                      display: "inline-block",
                      borderRadius: "3px",
                    }}
                  ></span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full my-[10px] ">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
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
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
