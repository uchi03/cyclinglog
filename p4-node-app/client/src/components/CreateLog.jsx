import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateLog = () => {
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [avgSpeed, setAvgSpeed] = useState('');
  const [calBurned, setCalBurned] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveLog = () => {
    setLoading(true);
    const data = {
      distance,
      duration,
      avgSpeed,
      calBurned,
    };
   
    axios
      .post('http://localhost:3001/api/logs', data)
      .then(() => {
        setLoading(false);
        navigate('/home');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <button onClick={handleBack} className='p-2 bg-gray-300 rounded font-bold'>
          Back
        </button>
        <h1 className='text-3xl my-4 font-bold'>Create Log</h1>
      </div>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-white'>
   
      <div className='my-4'>
        <label className='text-xl mr-4 text-black-500 font-bold'>Distance (km)</label>
        <input
          type='number'
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className='border-2 border-black-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-black-500 font-bold'>Duration (mins)</label>
        <input
          type='number'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className='border-2 border-black-500 px-4 py-2  w-full '
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-black-500 font-bold'>Avg Speed (km/h)</label>
        <input
          type='number'
          value={avgSpeed}
          onChange={(e) => setAvgSpeed(e.target.value)}
          className='border-2 border-black-500 px-4 py-2  w-full '
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-black-500 font-bold'>Cal Burned</label>
        <input
          type='number'
          value={calBurned}
          onChange={(e) => setCalBurned(e.target.value)}
          className='border-2 border-black-500 px-4 py-2  w-full '
        />
      </div>
      <button className='p-2 bg-sky-300 m-8 font-bold' onClick={handleSaveLog} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  </div>
  )
}

export default CreateLog