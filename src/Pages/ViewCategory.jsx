import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);

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
        let updateCategories = [...categories];
        let index = categories.findIndex((i) => i._id === e.target.value);
        updateCategories[index].status = text;
        setCategories(updateCategories);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };
  const handleDelete = async (_id) => {
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
    const updatedCategory = [...categories];
    const index = categories.findIndex((v) => v._id === _id);
    updatedCategory.splice(index, 1);
    setCategories(updatedCategory);
  };
  useEffect(() => {
    handleCategoryDataFetchOp();
  }, []);
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
                Delete{" "}
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
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
                    <tr className="border-b" key={i}>
                      <td>
                        <input
                          type="checkbox"
                          name="delete"
                          id="delete1"
                          className="accent-[#5351c9] cursor-pointer"
                        />
                      </td>
                      <td>{i + 1}</td>
                      <td>{v.name}</td>

                      <td className="w-[200px] flex-wrap p-1">
                        {v.description}
                      </td>
                      <td>
                        <MdDelete
                          className="my-[5px] text-red-500 cursor-pointer inline"
                          onClick={(e) => handleDelete(v._id)}
                        />{" "}
                        |{" "}
                        <Link
                          to={`/dashboard/category/update-category/${v._id}`}
                        >
                          <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                        </Link>
                      </td>
                      <td>
                        <button
                          value={v._id}
                          onClick={handleStatus}
                          className={`p-[5px_10px] rounded-[5px] ${
                            v.status ? `bg-green-500` : `bg-red-500`
                          } text-white`}
                        >
                          {v.status ? "Active" : "Inactive"}
                        </button>
                      </td>
                    </tr>
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
