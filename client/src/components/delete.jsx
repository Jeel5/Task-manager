import React from 'react';
import { Button, Popconfirm } from 'antd';
import axios from 'axios';

const Delete = ({ taskId, token, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3100/delete/${taskId}`, {
        headers: { authorization: token }
      });
      onDeleteSuccess(taskId);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
       <Button 
        danger 
        className="border-none"
        style={{ boxShadow: 'none', color: 'white', padding: '0', backgroundColor: 'transparent'}}
      >
        Delete
      </Button>
    </Popconfirm>
  );
};

export default Delete;