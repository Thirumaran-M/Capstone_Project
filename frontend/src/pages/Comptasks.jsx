import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import axios from "axios";

const Comptasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v2/get-complete-tasks", { headers });
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

export default Comptasks