import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [ifAllSelected, setIfAllSelected] = useState(false);

  const handleCategoryDataFetchOp = async () => {
    await axios
      .get(
        "http://localhost:4000/api/admin-panel/parent-category/read-parent-category"
      )
      .then((res) => {
        // console.log(res);
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMultipleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    await axios
      .post(
        "http://localhost:4000/api/admin-panel/parent-category/delete-parent-category",
        { _ids: selectedId }
      )
      .then((res) => {
        if (res.status === 200) alert("Deleted SuccessFully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleIdSelection = (e) => {
    const allIds = categories.map((v) => v._id);
    if (e.target.checked) {
      setSelectedId(allIds);
      setIfAllSelected(true);
    } else {
      setSelectedId([]);
      setIfAllSelected(false);
    }
  };

  useEffect(() => {
    setIfAllSelected(
      categories.length === selectedId.length && categories.length === 0
    );
    handleCategoryDataFetchOp();
  }, [categories, selectedId]);
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
                  className="bg-red-500 text-white rounded-[5px] p-[4px_10px] font-[300] mr-[10px]"
                  onClick={handleMultipleDelete}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  checked={ifAllSelected}
                  onChange={handleIdSelection}
                  className="accent-[#5351c9] cursor-pointer"
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0
              ? categories.map((v, i) => {
                  return (
                    <CategoryRow
                      category={v}
                      key={i}
                      index={i}
                      setSelectedFun={setSelectedId}
                      selectedId={selectedId}
                    />
                  );
                })
              : "No Categories Added."}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;

const CategoryRow = ({ category, index, setSelectedFun, selectedId }) => {
  const [readMore, setReadMore] = useState(false);
  const handleStatus = async (e) => {
    const text = e.target.textContent === "Active" ? false : true;
    // console.log(text, e.target.value);
    await axios
      .put(
        `http://localhost:4000/api/admin-panel/parent-category/update-status/${e.target.value}`,
        { text }
      )
      .then((res) => {
        // console.log(res);
        if (res.status !== 200) return alert("Something isn't Ok.");
        alert("Status updated Successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };
  const handleDelete = async (_id) => {
    if (
      !window.confirm(
        "Are you Sure? Once the parent category get deleted it will delete all the related product categories & products."
      )
    )
      return;
    await axios
      .delete(
        `http://localhost:4000/api/admin-panel/parent-category/delete-parent-category/${_id}`
      )
      .then((res) => {
        // console.log(res);
        alert("deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };

  const handleCheckedInputs = (e) => {
    const { checked, value } = e.target;
    try {
      if (checked) {
        const selectedIds = [...selectedId];
        selectedIds.push(value);
        setSelectedFun(selectedIds);
      } else {
        const selectedIds = [...selectedId].filter((idx) => idx !== value);
        setSelectedFun(selectedIds);
        console.log(selectedIds);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr className="border-b">
      <td>
        <input
          type="checkbox"
          name="delete"
          id="delete1"
          checked={selectedId.includes(category._id)}
          value={category._id}
          onChange={handleCheckedInputs}
          className="accent-[#5351c9] cursor-pointer"
        />
      </td>
      <td>{index + 1}</td>
      <td>{category.name}</td>

      <td className="w-[200px] flex-wrap p-1">
        {category.description.length < 100 || readMore === true
          ? category.description
          : category.description.slice(0, 100)}
        <span
          onClick={() => setReadMore(!readMore)}
          className={`${
            category.description.length <= 100 ? "hidden" : "cursor-pointer"
          }`}
        >
          <strong>{readMore === false ? "Read more" : "Show less"}</strong>
        </span>
      </td>
      <td>
        <MdDelete
          className="my-[5px] text-red-500 cursor-pointer inline"
          onClick={(e) => handleDelete(category._id)}
        />{" "}
        |{" "}
        <Link to={`/dashboard/category/update-category/${category._id}`}>
          <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
        </Link>
      </td>
      <td>
        <button
          value={category._id}
          onClick={handleStatus}
          className={`p-[5px_10px] rounded-[5px] ${
            category.status ? `bg-green-500` : `bg-red-500`
          } text-white`}
        >
          {category.status ? "Active" : "Inactive"}
        </button>
      </td>
    </tr>
  );
};
