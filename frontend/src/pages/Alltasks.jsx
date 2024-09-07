import React, { useState, useEffect } from 'react'
import Cards from '../components/Cards'
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from '../components/Home/InputData';
import axios from "axios";

const Alltasks = () => {
    const [InputDiv, SetInputDiv] = useState("hidden");
    const [Data, setData] = useState();
    const [UpdatedData, setUpdatedData] = useState({ id: "", title: "", desc: "" });
    
    const headers = { 
        id: localStorage.getItem("id"), 
        authorization: `Bearer ${localStorage.getItem("token")}`,
     };
    useEffect(() => {
        const fetch = async () => {
                const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
                //console.log(response)
                setData(response.data.data);
        }
        if(localStorage.getItem("id") && localStorage.getItem("token")){
           fetch();
        }
    });
   // Data && console.log(Data.tasks);
    
    return (
        <>
            <div>
                <div className="w-full flex justify-end px-4 py-2">
                    <button onClick={() => SetInputDiv("fixed")}>
                        <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration:300" />
                    </button>
                </div>
                {Data && (
                    <Cards home={"true"} SetInputDiv={SetInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData} />
                )}
            </div>
            <InputData InputDiv={InputDiv} SetInputDiv={SetInputDiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />
        </>
    )
}

export default Alltasks