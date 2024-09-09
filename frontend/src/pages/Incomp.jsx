import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import axios from "axios";

const Incomp = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://maran-task-management.onrender.com/api/v2/get-incomplete-tasks", { headers });
      //console.log(response)
      setData(response.data.data);
    }
    
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
   }
  });
  return (
    <div><Cards home={"false"} data={Data}/></div>
  )
}

export default Incomp