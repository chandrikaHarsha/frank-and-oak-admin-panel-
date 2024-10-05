import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewSizes = () => {
  const [sizes, setSizes] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [ifAllSelected, setIfAllSelected] = useState(false);

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

  const handleStatus = async (e) => {
    const newStatus = e.target.textContent === "Active" ? false : true;
    try {
      await axios
        .put(
          `http://localhost:4000/api/admin-panel/size/update-size-status/${e.target.value}`,
          { newStatus }
        )
        .then((res) => {
          if (res.status !== 200) return alert("Something is not ok.");
          alert("status updated.");
          const updateStatus = [...sizes];
          const index = updateStatus.findIndex((v) => v._id === e.target.value);
          updateStatus[index].status = newStatus;
          setSizes(updateStatus);
        });
    } catch (error) {
      console.log(error);
      alert("Error Occurred.");
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios
        .delete(`http://localhost:4000/api/admin-panel/size/delete-size/${_id}`)
        .then((res) => {
          if (res.status !== 200) return alert("Something is not ok.");
          alert("deleted successfully.");
          const updatedSize = [...sizes].filter((v) => v._id !== _id);
          setSizes(updatedSize);
        });
    } catch (error) {
      console.log(error);
      alert("Error Occurred.");
    }
  };

  const handleCheckedInputs = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      const checkedArr = [...selectedIds];
      checkedArr.push(value);
      setSelectedIds(checkedArr);
    } else {
      const checkedArr = [...selectedIds].filter((v) => v !== value);
      setSelectedIds(checkedArr);
    }
  };

  const handleMultipleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios
        .post("http://localhost:4000/api/admin-panel/size/delete-sizes", {
          _ids: selectedIds,
        })
        .then((res) => {
          if (res.status !== 200) return alert("Something is not ok.");
          alert("deleted successfully.");
        });
    } catch (error) {
      console.log(error);
      alert("Error Occurred.");
    }
  };

  const handleAllSelect = (e) => {
    const allIds = sizes.map((v) => v._id);
    if (e.target.checked) {
      setSelectedIds(allIds);
      setIfAllSelected(true);
    } else {
      setSelectedIds([]);
      setIfAllSelected(false);
    }
  };

  useEffect(() => {
    setIfAllSelected(sizes.length === selectedIds.length && sizes.length !== 0);

    handleSizeFetch();
  }, [sizes, selectedIds]);
  return (
    <div className="w-[90%] bg-white mx-auto border rounded-[10px] my-[150px]">
      <span className="block border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] h-[50px] p-[8px_16px] text-[23px] font-bold">
        View Size
      </span>
      <div className="w-[90%] mx-auto">
        <table className="w-full my-[20px]">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  onClick={handleMultipleDelete}
                  className="text-white bg-red-500 rounded-[5px] p-[4px_10px] font-[300] mr-[10px]"
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  checked={ifAllSelected}
                  onClick={handleAllSelect}
                  className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                />
              </th>
              <th>Sno</th>
              <th>Size Name</th>
              <th>Size Order</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sizes.length > 0
              ? sizes.map((v, i) => {
                  return (
                    <tr className="border-b" key={i}>
                      <td>
                        <input
                          type="checkbox"
                          value={v._id}
                          checked={selectedIds.includes(v._id)}
                          onClick={handleCheckedInputs}
                          name="delete"
                          className="accent-[#5351c9] cursor-pointer input"
                        />
                      </td>
                      <td>{i + 1}</td>
                      <td>{v.size}</td>
                      <td>{v.sizeOrder}</td>
                      <td className="flex gap-[5px]">
                        <MdDelete
                          className="my-[5px] text-red-500 cursor-pointer"
                          onClick={(e) => handleDelete(v._id)}
                        />{" "}
                        |{" "}
                        <Link to={`/dashboard/sizes/update-size/${v._id}`}>
                          <CiEdit className="my-[5px] text-yellow-500 cursor-pointer" />
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={handleStatus}
                          value={v._id}
                          className={`p-[4px_10px] rounded-[5px] text-white ${
                            v.status ? "bg-green-500" : "bg-red-400"
                          }`}
                        >
                          {v.status ? "Active" : "Inactive"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "No Size information added."}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSizes;
