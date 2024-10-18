import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const LogsTable = ({ logs }) => {
  return (
    <div className='p-4 border-2 border-slate-600 rounded-md bg-white'>
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='border-2 border-slate-600 rounded-md'>No</th>
            <th className='border-2 border-slate-600 rounded-md'>User ID</th>
            <th className='border-2 border-slate-600 rounded-md'>Date</th>
            <th className='border-2 border-slate-600 rounded-md max-md:hidden'>
              Distance (km)
            </th>
            <th className='border-2 border-slate-600 rounded-md max-md:hidden'>
              Duration (minutes)
            </th>
            <th className='border-2 border-slate-600 rounded-md max-md:hidden'>
              Avg Speed (km/h)
            </th>
            <th className='border-2 border-slate-600 rounded-md max-md:hidden'>
              Cal Burned
            </th>
            <th className='border-2 border-slate-600 rounded-md'>Operations</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={log._id} className='h-8'>
              <td className='border-2 border-slate-700 rounded-md text-center'>
                {index + 1}
              </td>
              <td className='border-2 border-slate-700 rounded-md text-center'>
                {log.userID}
              </td>
              <td className='border-2 border-slate-700 rounded-md text-center'>
                {log.createdAt}
              </td>
              <td className='border-2 border-slate-700 rounded-md text-center max-md:hidden'>
                {log.distance} km
              </td>
              <td className='border-2 border-slate-700 rounded-md text-center max-md:hidden'>
                {log.duration} minutes
              </td>
              <td className='border-2 border-slate-700 rounded-md text-center max-md:hidden'>
                {log.avgSpeed} km/h
              </td>
              <td className='border-2 border-slate-700 rounded-md text-center max-md:hidden'>
                {log.calBurned}
              </td>
              <td className='border-2 border-slate-700 rounded-md text-center'>
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/api/logs/details/${log._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/api/logs`}>
                    <MdOutlineAddBox className='text-2xl text-green-800' />
                  </Link>
                  <Link to={`/api/logs/edit/${log._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                  </Link>
                  <Link to={`/api/logs/delete/${log._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;