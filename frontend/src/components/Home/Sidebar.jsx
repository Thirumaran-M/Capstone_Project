//import { useMemo } from 'react';
import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/auth";

const Sidebar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const data = [
        {
            title: "All Tasks",
            icon: <CgNotes />,
            link: "/"
        },
        {
            title: "Important Tasks",
            icon: <MdLabelImportantOutline />,
            link: "/Impotask"
        },
        {
            title: "Completed Tasks",
            icon: <FaCheckDouble />,
            link: "/Comptasks"
        },
        {
            title: "Not Completed Tasks",
            icon: <TbNotebookOff />,
            link: "/Incomp"
        },
    ]

    const [Data, setData] = useState();
      const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
//        localStorage.removeItem("id");
 //       localStorage.removeItem("token");
        history("/signup");
    }    

    const headers = { 
        id: localStorage.getItem("id"), 
        authorization: `Bearer ${localStorage.getItem("token")}`,
     };

  useEffect(() => {
        const fetch = async () => {
                const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
                setData(response.data.data);
        }
        fetch();
    }, []);
    return (
        <>
            {Data && (
                <div>
                    <h2 className="text-xl font-semibold">{Data.username}</h2>
                    <h4 className="mb-1 text-gray-400">{Data.email}</h4>
                    <hr />
                </div>
            )}
            <div>
                {data.map((items, i) => (
                    <Link to={items.link} key={i} className="my-2 flex items center hover:bg-gray-500 rounded p-2 transition:all duration:300">
                        {items.icon}&#x00A0;{items.title}
                    </Link>
                ))}
            </div>

            <div>
                <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>Log Out</button>
            </div>
        </>
    )
}

export default Sidebar