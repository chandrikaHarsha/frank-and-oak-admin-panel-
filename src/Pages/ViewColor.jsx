import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewColor = () => {
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
                <button className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]">
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
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
            <tr className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  name="delete"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </td>
              <td className="p-2">1</td>
              <td className="p-2">red</td>
              <td className="p-2">
                <div className="w-[90%] mx-auto h-[20px] bg-red-500 border"></div>
              </td>
              <td className="p-2">
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to="/dashboard/color/update-colors">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td className="p-2">
                <button className="bg-green-600 text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer">
                  Active
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  name="delete"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </td>
              <td className="p-2">2</td>
              <td className="p-2">green</td>
              <td className="p-2">
                <div className="w-[90%] mx-auto h-[20px] bg-green-500 border"></div>
              </td>
              <td className="p-2">
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to="/dashboard/color/update-colors">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td className="p-2">
                <button className="bg-green-600 text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer">
                  Active
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  name="delete"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </td>
              <td className="p-2">3</td>
              <td className="p-2">blue</td>
              <td className="p-2">
                <div className="w-[90%] mx-auto h-[20px] bg-blue-500 border"></div>
              </td>
              <td className="p-2">
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to="/dashboard/color/update-colors">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td className="p-2">
                <button className="bg-green-600 text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer">
                  Active
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewColor;
