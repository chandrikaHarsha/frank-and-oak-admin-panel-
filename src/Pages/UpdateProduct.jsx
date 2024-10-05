import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [product, setProduct] = useState({});
  const [filename, setFilename] = useState({});
  const [activeProductCategories, setActiveProductCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState([]);
  const [ifCheckedSizes, setIfCheckedSizes] = useState([]);
  const [ifCheckedColors, setIfCheckedColors] = useState([]);
  const [newImages, setNewImages] = useState({});

  const { _id } = useParams();
  const navigate = useNavigate();

  const handleCheckedSizes = (e) => {
    if (e.target.checked) {
      setIfCheckedSizes((prev) => [...prev, e.target.value]);
    } else {
      setIfCheckedSizes((prev) => prev.filter((v) => v !== e.target.value));
    }
    setProduct({ ...product, size: ifCheckedSizes });
  };

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

  const handleCheckedColors = (e) => {
    if (e.target.checked) {
      setIfCheckedColors((prev) => [...prev, e.target.value]);
    } else {
      setIfCheckedColors((prev) => prev.filter((v) => v !== e.target.value));
    }
    setProduct({ ...product, color: ifCheckedColors });
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

  const fetchProduct = async () => {
    await axios
      .get(
        `http://localhost:4000/api/admin-panel/products/update-product-by-id/${_id}`
      )
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data.data);
          setFilename(res.data.filename);
          console.log(product);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const data = e.target;
    await axios
      .put(
        `http://localhost:4000/api/admin-panel/products/update-product/${_id}`,
        data
      )
      .then((res) => {
        if (res.status === 200) alert("Product updated successfully.");
        navigate("/dashboard/products/view-product");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleMultipleFiles = (e) => {
    const files = e.target.files;
    const name = e.target.name;
    const fileArray = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function () {
        const fileData = this.result;
        fileArray.push(fileData);
        setNewImages({ ...newImages, [name]: fileArray });
      };
      reader.readAsDataURL(file);
      console.log(newImages);
    });
  };

  useEffect(() => {
    activeProductCategoriesAPI();
    fetchProduct();
    handleColorFetchAPI();
    handleSizeFetch();
  }, []);

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Update Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={updateProduct}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
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
              value={product.short_description}
              onChange={(e) =>
                setProduct({ ...product, short_description: e.target.value })
              }
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <div className="w-[300px] object-contain">
              <img
                src={
                  newImages.thumbnail
                    ? newImages.thumbnail
                    : `${filename}${product.thumbnail}`
                }
                alt={product.name}
                className="w-full"
                id="thumbnail"
              />
            </div>
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
              type="file"
              id="product_img"
              name="thumbnail"
              onChange={(e) => {
                const [file] = e.target.files;
                const name = e.target.name;
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function () {
                    setNewImages({ ...newImages, [name]: this.result });
                  };
                  reader.readAsDataURL(e.target.files[0]);
                  console.log(product);
                }
              }}
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <div className="w-[300px] object-contain">
              <img
                src={
                  newImages.hover_thumbnail
                    ? newImages.hover_thumbnail
                    : `${filename}${product.hover_thumbnail}`
                }
                alt={product.name}
                className="w-full"
              />
            </div>
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="image_animation"
              name="hover_thumbnail"
              onChange={(e) => {
                const [file] = e.target.files;
                const name = e.target.name;
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function () {
                    setNewImages({ ...newImages, [name]: this.result });
                  };
                  reader.readAsDataURL(e.target.files[0]);
                  console.log(product);
                }
              }}
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            {newImages.images ? (
              <div className="w-full min-h-[250px] object-contain grid grid-flow-col border gap-[20px] place-content-center">
                {newImages.images.map((v, i) => (
                  <img
                    src={v}
                    alt={product.name}
                    className="w-[200px] h-[200px]"
                    key={i}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full min-h-[250px] object-contain grid grid-flow-col border gap-[20px] place-content-center">
                {product.images ? (
                  product.images.map((v, i) => (
                    <img
                      src={`${filename}${v}`}
                      alt={product.name}
                      className="w-[200px] h-[200px]"
                      key={i}
                    />
                  ))
                ) : (
                  <span className="font-[500]">
                    "No product images added yet."
                  </span>
                )}
              </div>
            )}
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="product_gallery"
              name="images"
              onChange={handleMultipleFiles}
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
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
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
                value={product.actual_price}
                onChange={(e) =>
                  setProduct({ ...product, actual_price: e.target.value })
                }
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          {/* <div className="w-full my-[10px] ">
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
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px] ">
            <div className="w-full h-full place-content-center grid grid-cols-[1fr_2fr] gap-[10px]">
              <label htmlFor="productCategory" className="block text-[#303640]">
                Selected Product Category
              </label>
              <span className="block w-full p-2 border rounded-md">
                {product.product_category
                  ? product.product_category.product_category_name
                  : ""}
              </span>
            </div>
            <div className="w-full my-[10px]">
              <label
                htmlFor="product_category"
                className="block text-[#303640]"
              >
                Select Product Category
              </label>
              <select
                id="product_category"
                name="product_category"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    product_category: e.target.value,
                  })
                }
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
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="stock"
                id="stock"
                value={product.stock}
                onChange={(e) => {
                  setProduct({ ...product, stock: e.target.value });
                }}
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
                value={product.brand}
                onChange={(e) =>
                  setProduct({ ...product, brand: e.target.value })
                }
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="size" className="block text-[#303640]">
                Size
              </label>
              <div className="flex gap-[10px] font-[500]">
                <span>Selected Sizes: </span>
                {product.size
                  ? product.size.map((v, i) => <span key={i}>{v.size}</span>)
                  : ""}
              </div>
              <div className="w-full m-[30px_0]">
                <span className="block m-[10px_0] font-[400]">Sizes</span>
                <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-[20px]">
                  {sizes.map((v, i) => (
                    <div>
                      <label
                        htmlFor="size"
                        className="mr-[10px] text-[#303640]"
                      >
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
            </div>
            <div>
              <label htmlFor="color" className="block text-[#303640]">
                Color
              </label>
              <div className="flex gap-[10px] font-[500]">
                <span>Selected Colors: </span>
                {product.color
                  ? product.color.map((v, i) => {
                      return <span key={i}>{v.color}</span>;
                    })
                  : ""}
              </div>
              <div className="w-full grid grid-cols-[1fr_1fr_1fr] gap-[20px] my-[20px]">
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
          </div>

          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[200px] h-[35px]">
              update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
