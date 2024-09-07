import React from 'react'
import { MdOutlineNotificationImportant } from "react-icons/md";
import { MdNotificationImportant } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from 'axios';

//http://localhost:1100
const Cards = ({ home, SetInputDiv, data, setUpdatedData }) => {

    // console.log("****", data);

    // const data = [
    //     {
    //         title: "Project 1",
    //         desc: "My Project 1 sample data",
    //         status: "Complete"
    //     },
    //     {
    //         title: "Project 2",
    //         desc: "My Project 2 sample data",
    //         status: "In Complete"
    //     },
    //     {
    //         title: "Project 3",
    //         desc: "My Project 3 sample data",
    //         status: "Complete"
    //     },
    //     {
    //         title: "Project 4",
    //         desc: "My Project 4 sample data",
    //         status: "In Complete"
    //     }
    // ]
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const handleCompTask = async (id) => {
        try {
            await axios.put(`https://maran-task-management.onrender.com/api/v2/update-complete-task/${id}`, {}, { headers });
            //alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleImpoTask = async (id) => {
        try {
           await axios.put(`https://maran-task-management.onrender.com/api/v2/update-imp-task/${id}`, {}, { headers });
            //alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (id, title, desc) => {
        SetInputDiv("fixed");
        setUpdatedData({ id: id, title: title, desc: desc });
    }

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`https://maran-task-management.onrender.com/api/v2/delete-task/${id}`, { headers });
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {data &&
                data.map((items, i) => (
                    <div className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
                        <div>
                            <h3 className="text-xl">{items.title}</h3>
                            <p className="text-gray-300 my-2">{items.desc}</p>
                        </div>
                        <div className="mt-4 w-full flex items-center">
                            <button className={`${items.complete === false ? "bg-red-400" : "bg-green-400"} p-2 rounded w-3/6`} onClick={() => handleCompTask(items._id)}>{items.complete === true ? "Completed" : "Not Completed"}</button>
                            <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                                <button onClick={() => handleImpoTask(items._id)}>
                                    {items.important === true ? <MdNotificationImportant className="text-3xl text-red-500" /> : <MdOutlineNotificationImportant className="text-3xl" />}
                                </button>
                                {home === "true" && 
                                <button onClick={() => handleUpdate(items._id, items.title, items.desc)}>
                                    <FaEdit />
                                </button>}
                                <button onClick={() => deleteTask(items._id)}>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>

                    </div>

                ))}
            {home === "true" && (
                <button className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration:300" onClick={() => SetInputDiv("fixed")}>
                    <IoAddCircleSharp className="text-5xl" />
                    <h2 className="text-2xl mt-4">Add Task</h2>
                </button>
            )}
        </div>
    )
}

export default Cards