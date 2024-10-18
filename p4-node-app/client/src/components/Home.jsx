import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LogsTable from './LogsTable';
import { MdOutlineAddBox } from 'react-icons/md';


function Home() {
    const [showType, setShowType] = useState('table');
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(location.state?.user);
    useEffect(() => {
        setLoading(true);
        axios
          .get('http://localhost:3001/api/logs')
          .then((response) => {
            setLogs(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }, []);

      useEffect(() => {
        if (!user) {
            axios.get('http://localhost:3001/user', { withCredentials: true })
                .then(response => {
                    if (response.data.user) {
                        setUser(response.data.user);
                    } else {
                        navigate("/login");
                    }
                })
                .catch(() => navigate("/login"))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    if (loading) {
        return <center><h1>Loading...</h1></center>;
    }

    return (
        <center>
          
              <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Logs List</h1>
            <Link to='/api/logs'>
              <MdOutlineAddBox className='text-white text-4xl' />
            </Link>
          </div>
             <LogsTable logs={logs} />
        </center>
    );
}

export default Home;
