import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const [data, setData] = useState([]);
  const [loadingTime, setLoadingTime] = useState(0);

  const fetchdata = async () => {
    const startTime = new Date().getTime();
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    const endTime = new Date().getTime();
    const timeTaken = endTime - startTime;
    setLoadingTime(timeTaken);
    setData(data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleDelete = (id) => {
    const updatedData = data.filter((user) => user.id !== id);
    console.log(updatedData);
    setData(updatedData.map((user, index) => ({ ...user, id: index + 1 })));
  };

  return (
    <>
      <button onClick={fetchdata}>Fetch Data</button>
      <p>Time taken to fetch data: {loadingTime} milliseconds</p>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <FontAwesomeIcon icon={faTrashAlt} style={{marginLeft: "1vw"}}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default User;
