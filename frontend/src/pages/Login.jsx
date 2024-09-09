import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {authActions} from "../store/auth";

const Login = () => {
    const [Data, setData] = useState({ username: "", password: "" });
    const history = useNavigate();
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn === true) {
        history("/");
    }
    const dispatch = useDispatch();
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };
    const submit = async () => {
        try {
            if (Data.username === "" || Data.password === "") {
                alert("All Fields are Required!");
            } else {
                console.log(Data);
                const response = await axios.post("https://maran-task-management.onrender.com/api/v1/log-in", Data);
                console.log(response);
                setData({ username: "", password: "" });
                //alert(response.data.message);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                dispatch(authActions.login());
                history("/"); // Redirect to dashboard
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className="text-2xl font-semibold">Login</div>
                <input type="username" placeholder="User Name" name="username" value={Data.username} onChange={change} className="bg-gray-700 px-3 py-2 my-3 w-full rounded" />
                <input type="password" placeholder="Password" name="password" value={Data.password} onChange={change} className="bg-gray-700 px-3 py-2 my-3 w-full rounded" />
                <div className="w-full flex items-center justify-between">
                    <button className="bg-blue-400 text-l font-semibold text-black px-3 py-2 rounded" onClick={submit}>Login</button>
                <Link to="/signup" className="text-gray-400 hover:text-gray-200">New User? SignUp Here</Link>
                </div>
            </div>
        </div>
    )
}

export default Login