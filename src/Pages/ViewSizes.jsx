import React from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

const ViewSizes = () => {
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
            <tr className="border-b">
              <td>
                <input
                  type="checkbox"
                  name="delete"
                  className="accent-[#5351c9] cursor-pointer input"
                />
              </td>
              <td>1</td>
              <td>S</td>
              <td>1</td>
              <td className="flex gap-[5px]">
                <MdDelete className="my-[5px] text-red-500 cursor-pointer" /> |{" "}
                <Link to="/dashboard/sizes/update-size">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer" />
                </Link>
              </td>
              <td>Display</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSizes;
