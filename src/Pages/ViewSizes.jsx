import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewSizes = () => {
  const [sizes, setSizes] = useState([]);

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

  useEffect(() => {
    handleSizeFetch();
  }, []);
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
                Delete
                <input
                  type="checkbox"
                  name="deleteAll"
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
                          name="delete"
                          className="accent-[#5351c9] cursor-pointer input"
                        />
                      </td>
                      <td>{i + 1}</td>
                      <td>{v.size}</td>
                      <td>{v.sizeOrder}</td>
                      <td className="flex gap-[5px]">
                        <MdDelete className="my-[5px] text-red-500 cursor-pointer" />{" "}
                        |{" "}
                        <Link to="/dashboard/sizes/update-size">
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
