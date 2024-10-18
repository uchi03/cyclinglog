import React, { useState } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteLog = () => {
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteLog = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3001/api/logs/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Log</h1>
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this log?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteLog}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteLog