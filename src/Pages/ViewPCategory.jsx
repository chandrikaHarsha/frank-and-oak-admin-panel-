import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewCategory = () => {
  let [productCategories, setProductCategories] = useState([]);
  let [path, setPath] = useState({});
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [ifAllChecked, setIfAllChecked] = useState(false);

  const handleFetchProductCategoryAPI = async () => {
    await axios
      .get(
        "http://localhost:4000/api/admin-panel/product-category/read-product-category"
      )
      .then((res) => {
        if (res.status === 200) {
          setProductCategories(res.data.data);
          setPath(res.data.path);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMultiDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    await axios
      .put(
        "http://localhost:4000/api/admin-panel/product-category/multi-delete-product-categories",
        { _ids: checkedInputs }
      )
      .then((res) => {
        if (res.status === 200) return alert("Deleted Successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleAllSelect = (e) => {
    const allIds = productCategories.map((v) => v._id);
    if (e.target.checked) {
      setCheckedInputs(allIds);
      console.log(checkedInputs);
      setIfAllChecked(true);
    } else {
      setCheckedInputs([]);
      console.log(checkedInputs);
      setIfAllChecked(false);
    }
  };

  useEffect(() => {
    setIfAllChecked(
      checkedInputs.length === productCategories.length &&
        productCategories.length !== 0
    );
    handleFetchProductCategoryAPI();
  }, [productCategories, checkedInputs]);

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-500 text-white rounded-[5px] p-[4px_10px] mr-[10px] font-[300]"
                  onClick={handleMultiDelete}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  checked={ifAllChecked}
                  onClick={handleAllSelect}
                  id="deleteAllCat"
                  className="accent-[#5351c9] cursor-pointer"
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Parent Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {productCategories.length === 0
              ? "No  Product Category Found"
              : productCategories.map((v, i) => (
                  <ProductCategoryRows
                    key={i}
                    product={v}
                    index={i}
                    filepath={path}
                    productFun={setProductCategories}
                    checkedInput={checkedInputs}
                    checkedInputFun={setCheckedInputs}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;

const ProductCategoryRows = ({
  product,
  index,
  filepath,
  productFun,
  checkedInput,
  checkedInputFun,
}) => {
  const [readMore, setReadMore] = useState(false);
  const handleStatus = async (e) => {
    const newStatus = e.target.textContent === "Active" ? false : true;
    // console.log(newStatus, e.target.value, e.target.textContent);

    await axios
      .put(
        `http://localhost:4000/api/admin-panel/product-category/update-product-category-status/${e.target.value}`,
        { newStatus }
      )
      .then((res) => {
        if (res.status === 200) return alert("status updated successfully.");
        productFun(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleSingleDelete = async (_id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios
      .delete(
        `http://localhost:4000/api/admin-panel/product-category/delete-product-category/${_id}`
      )
      .then((res) => {
        if (res.status === 200) return alert("deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleIfChecked = (e) => {
    if (e.target.checked) {
      checkedInputFun((prev) => [...prev, e.target.value]);
    } else {
      checkedInputFun((prev) =>
        prev.filter((inputId) => inputId !== e.target.value)
      );
    }
  };
  return (
    <tr className="border-b">
      <td>
        <input
          type="checkbox"
          name="delete"
          value={product._id}
          checked={checkedInput.includes(product._id)}
          onChange={handleIfChecked}
          id="delete1"
          className="accent-[#5351c9] cursor-pointer"
        />
      </td>
      <td>{index + 1}</td>
      <td>{product.product_category_name}</td>
      <td className="object-contain p-2">
        <img
          src={`${filepath}${product.thumbnail}`}
          alt="product men's t-shirt"
          width={80}
          height={80}
        />
      </td>
      <td>{product.parent_category.name}</td>
      <td className="w-[200px] flex-wrap p-1">
        {product.description.length > 100 && !readMore
          ? product.description.slice(0, 100)
          : product.description}
        <span
          onClick={() => setReadMore(!readMore)}
          className={`${
            product.description.length >= 100 ? "cursor-pointer" : "hidden"
          }`}
        >
          <strong>{readMore ? "Show less" : "Read More"}</strong>{" "}
        </span>
      </td>
      <td>
        <MdDelete
          className="my-[5px] text-red-500 cursor-pointer inline"
          onClick={(e) => handleSingleDelete(product._id)}
        />{" "}
        |{" "}
        <Link to={`/dashboard/products/update-category/${product._id}`}>
          <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
        </Link>
      </td>
      <td>
        <button
          className={`p-[4px_10px] rounded-md ${
            product.status ? "bg-green-500" : "bg-red-500"
          } text-white`}
          value={product._id}
          onClick={handleStatus}
        >
          {product.status ? "Active" : "Inactive"}
        </button>
      </td>
    </tr>
  );
};
