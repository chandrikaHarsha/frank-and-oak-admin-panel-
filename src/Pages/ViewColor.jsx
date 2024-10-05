import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewColor = () => {
  const [color, setColor] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [ifAllChecked, setIfAllChecked] = useState(false);

  // console.log(color);
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

  const handleStatus = async (e) => {
    const newStatus = e.target.textContent === "Active" ? false : true;
    // console.log(newStatus, e.target.value);

    await axios
      .put(
        `http://localhost:4000/api/admin-panel/color/update-color-status/${e.target.value}`,
        { newStatus }
      )
      .then((res) => {
        if (res.status === 200) alert("status updated successfully.");
        const updateStatus = [...color];
        const index = updateStatus.findIndex(
          (idx) => idx._id === e.target.value
        );
        updateStatus[index].status = newStatus;
        setColor(updateStatus);
      })
      .catch((error) => {
        console.log(error);
        alert("Error occurred.");
      });
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios
        .delete(
          `http://localhost:4000/api/admin-panel/color/delete-color/${_id}`
        )
        .then((res) => {
          if (res.status !== 200) return alert("Something is not ok.");
          alert("deleted successfully.");
          const updatedColor = [...color].filter((v) => v._id !== _id);
          setColor(updatedColor);
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
    await axios
      .post("http://localhost:4000/api/admin-panel/color/delete-colors", {
        _ids: selectedIds,
      })
      .then((res) => {
        if (res.status === 200) alert("Deleted SuccessFully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occurred.");
      });
  };
  const handleSelectAll = (e) => {
    const allIds = color.map((v) => v._id);
    if (e.target.checked) {
      setSelectedIds(allIds);
      setIfAllChecked(true);
    } else {
      setSelectedIds([]);
      setIfAllChecked(false);
    }
  };

  useEffect(() => {
    setIfAllChecked(color.length === selectedIds.length && color.length !== 0);
    handleColorFetchAPI();
  }, [color, selectedIds]);
  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
      <span className="block h-[40px] border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] p-[8px_16px] text-[20px]">
        View Color
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button
                  className="bg-red-500 font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]"
                  onClick={handleMultipleDelete}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  checked={ifAllChecked}
                  onClick={handleSelectAll}
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Color Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {color.length > 0
              ? color.map((v, i) => {
                  return (
                    <tr className="border-b" key={i}>
                      <td className="p-2">
                        <input
                          type="checkbox"
                          name="delete"
                          value={v._id}
                          checked={selectedIds.includes(v._id)}
                          onChange={handleCheckedInputs}
                          className="cursor-pointer accent-[#5351c9] input"
                        />
                      </td>
                      <td className="p-2">{i + 1}</td>
                      <td className="p-2">{v.color}</td>
                      <td className="p-2">
                        <div
                          className={`w-[90%] mx-auto h-[20px] border`}
                          style={{ backgroundColor: `${v.colorCode}` }}
                        ></div>
                      </td>
                      <td className="p-2">
                        <MdDelete
                          className="my-[5px] text-red-500 cursor-pointer inline"
                          onClick={() => handleDelete(v._id)}
                        />{" "}
                        |{" "}
                        <Link to={`/dashboard/color/update-colors/${v._id}`}>
                          <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                        </Link>
                      </td>
                      <td className="p-2">
                        <button
                          className={`${
                            v.status ? "bg-green-600" : "bg-red-500"
                          } text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer`}
                          value={v._id}
                          onClick={handleStatus}
                        >
                          {v.status ? "Active" : "Inactive"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "No Color Added Yet."}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewColor;
