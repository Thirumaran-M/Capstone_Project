import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";

const Signup = () => {
    const history = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    
    if (isLoggedIn === true) {
        history("/");
    }
    const [Data, setData] = useState({ username: "", email: "", password: "" });
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };
    const submit = async () => {
        try {
            if (Data.username === "" || Data.email === "" || Data.password === "") {
                alert("All Fields are Required!");
            } else {
                const response = await axios.post("https://maran-task-management.onrender.com/api/v1/sign-in", Data);
                //console.log(response);
                setData({ username: "", email: "", password: "" });
                alert(response.data.message);
                history("/login");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className="text-2xl font-semibold">SignUp</div>
                <input type="username" placeholder="User Name" name="username" value={Data.username} onChange={change} className="bg-gray-700 px-3 py-2 my-3 w-full rounded" />
                <input type="email" placeholder="E-Mail" name="email" value={Data.email} onChange={change} className="bg-gray-700 px-3 py-2 my-3 w-full rounded" />
                <input type="password" placeholder="Password" name="password" value={Data.password} onChange={change} className="bg-gray-700 px-3 py-2 my-3 w-full rounded" />
                <div className="w-full flex items-center justify-between">
                    <button className="bg-blue-400 text-l font-semibold text-black px-3 py-2 rounded" onClick={submit}>SignUp</button>
                    <Link to="/login" className="text-gray-400 hover:text-gray-200">Existing User? Login Here</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup