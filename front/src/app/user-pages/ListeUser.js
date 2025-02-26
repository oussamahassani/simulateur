import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios';

export function BasicTable() {
  // State to store users data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user/alluser');
        console.log(response.data)
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Basic Tables </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
            <li className="breadcrumb-item active" aria-current="page">User Tabel</li>
          </ol>
        </nav>
      </div>
      <div className="row">


        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">User Table</h4>
              <p className="card-description"> List<code>User</code>
              </p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th> User </th>
                      <th> First name </th>
                      <th> LastName </th>
                      <th> Email </th>
                      <th> Role </th>
                    </tr>
                  </thead>
                  <tbody>

                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default BasicTable
