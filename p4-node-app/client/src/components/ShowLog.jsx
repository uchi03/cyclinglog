import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';

const ShowLog = () => {
  const [log, setLog] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/api/logs/${id}`)
      .then((response) => {
        setLog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <BackButton />
        <h1 className='text-3xl my-1'>Show Log</h1>
      </div>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 bg-white'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-black-500 font-bold'>Id:</span>
          <span>{log._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-black-500 font-bold'>Date:</span>
          <span>{new Date(log.createdAt).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-black-500 font-bold'>Distance:</span>
          <span>{log.distance} km</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-black-500 font-bold'>Duration:</span>
          <span>{log.duration} minutes</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-black-500 font-bold'>Avg Speed:</span>
          <span>{log.avgSpeed} km/h</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-black-500 font-bold'>Cal Burned:</span>
          <span>{log.calBurned}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowLog;
