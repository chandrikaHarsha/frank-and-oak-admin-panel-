import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [path, setPath] = useState({});
  const [ifChecked, setIfChecked] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const getProducts = async () => {
    await axios
      .get("http://localhost:4000/api/admin-panel/products/read-products")
      .then((res) => {
        setProducts(res.data.data);
        setPath(res.data.filename);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };

  const handleAllSelect = (e) => {
    const allIds = products.map((v) => v._id);
    if (e.target.checked) {
      setIfChecked(allIds);
      setAllSelected(true);
    } else {
      setIfChecked([]);
      setAllSelected(false);
    }
  };
  const handleMultiDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    await axios
      .put(
        "http://localhost:4000/api/admin-panel/products/multi-delete-products",
        { _ids: ifChecked }
      )
      .then((res) => {
        if (res.status === 200) alert("deleted successfully.");
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };
  useEffect(() => {
    setAllSelected(
      products.length === ifChecked.length && products.length !== 0
    );
    getProducts();
  }, [products]);

  return (
    <div className="w-[90%] mx-auto my-[150px] rounded-[10px] bg-white border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] font-bold p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Product
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full text-balance">
          <thead>
            <tr className="border-b text-left text-[13px]">
              <th className="flex gap-[5px]">
                <button
                  className="bg-red-500 text-white p-[4px_10px] font-[400] rounded-md"
                  onClick={handleMultiDelete}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="delete"
                  checked={allSelected}
                  onClick={handleAllSelect}
                  className="input accent-[#5351c9] cursor-pointer h-[fit-content] m-[5px]"
                />
              </th>
              <th>Sno</th>
              <th>Product Name</th>
              <th>Product Category Name</th>
              <th>Description</th>
              <th>Short Description</th>
              <th>Thumbnail</th>
              <th>Product Images</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0
              ? "No products added yet"
              : products.map((v, i) => (
                  <>
                    <ViewProductsRow
                      products={v}
                      key={i}
                      index={i}
                      filename={path}
                      checkedFun={setIfChecked}
                      checked={ifChecked}
                    />
                  </>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewProduct;

const ViewProductsRow = ({
  products,
  index,
  filename,
  checkedFun,
  checked,
}) => {
  const [hover, setHover] = useState(false);
  const [description, setDescription] = useState(false);
  const [shortDescription, setShortDescription] = useState(false);

  const handleStatus = async (e) => {
    const newStatus = e.target.textContent === "Active" ? false : true;
    console.log(newStatus, e.target.value);

    await axios
      .put(
        `http://localhost:4000/api/admin-panel/products/update-product-status/${e.target.value}`,
        { newStatus }
      )
      .then((res) => {
        if (res.status === 200) alert("status updated successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };

  const handleSingleProductDelete = async (_id) => {
    await axios
      .delete(
        `http://localhost:4000/api/admin-panel/products/delete-product/${_id}`
      )
      .then((res) => {
        if (res.status === 200) alert("product deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred");
      });
  };

  const handleMultiDelete = (e) => {
    if (e.target.checked) {
      checkedFun([...checked, e.target.value]);
    } else {
      checkedFun((prev) => prev.filter((v) => v !== e.target.value));
    }
  };
  return (
    <tr className="border-b">
      <td>
        <input
          type="checkbox"
          id="delete"
          name="delete"
          checked={checked.includes(products._id)}
          value={products._id}
          onChange={handleMultiDelete}
          className="input accent-[#5351c9] cursor"
        />
      </td>
      <td>{index + 1}</td>
      <td>{products.name}</td>
      <td>
        {products.product_category
          ? products.product_category.product_category_name
          : ""}
      </td>
      <td className="p-2">
        {products.description.length >= 100 && !description
          ? products.description.slice(0, 100)
          : products.description}
        <span
          className={
            products.description.length < 100
              ? `hidden`
              : `cursor-pointer font-bold`
          }
          onClick={() => setDescription(!description)}
        >
          {description ? "Show Less" : "Read More"}
        </span>
      </td>
      <td className="p-2">
        {products.short_description.length >= 100 && !shortDescription
          ? products.short_description.slice(0, 100)
          : products.short_description}
        <span
          className={
            products.short_description.length < 100
              ? `hidden`
              : `cursor-pointer font-bold`
          }
          onClick={() => setShortDescription(!shortDescription)}
        >
          {shortDescription ? "Show Less" : "Read More"}
        </span>
      </td>
      <td className="object-contain">
        <img
          src={
            hover
              ? `${filename}${products.hover_thumbnail}`
              : `${filename}${products.thumbnail}`
          }
          alt="thumbnail"
          width={100}
          height={100}
          className="rounded-[5px] cursor-pointer"
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        />{" "}
      </td>
      <td className="object-contain flex flex-col gap-[20px]">
        {products.images
          ? products.images.map((img, i) => (
              <img
                src={`${filename}${img}`}
                alt="men's t-shirt"
                width={100}
                height={100}
                className="rounded-[5px]"
                key={i}
              />
            ))
          : ""}
      </td>
      <td className="w-[50px]">
        <MdDelete
          className="my-[5px] text-red-500 cursor-pointer inline"
          onClick={() => handleSingleProductDelete(products._id)}
        />{" "}
        |{" "}
        <Link to={`/dashboard/products/update-product/${products._id}`}>
          <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
        </Link>
      </td>
      <td>
        <button
          value={products._id}
          className={`p-[4px_10px] rounded-md ${
            products.status ? "bg-green-500" : "bg-red-500"
          } text-white`}
          onClick={handleStatus}
        >
          {products.status ? "Active" : "Inactive"}
        </button>
      </td>
    </tr>
  );
};
