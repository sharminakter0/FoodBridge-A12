import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`https://food-donation-server-mu.vercel.app/users`);
      setUsers(res.data);
    } catch  {
      toast.error('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(`https://food-donation-server-mu.vercel.app/users/role/${id}`, { role });
      toast.success(`Role changed to ${role}`);
      fetchUsers();
    } catch {
      toast.error('Role update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`https://food-donation-server-mu.vercel.app/users/${id}`);
      toast.success('User deleted');
      fetchUsers();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full  shadow rounded">
          <thead className="">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleRoleChange(user._id, 'admin')}
                    className="btn btn-sm bg-blue-500 text-white"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleRoleChange(user._id, 'restaurant')}
                    className="btn btn-sm bg-green-500 text-white"
                  >
                    Make Restaurant
                  </button>
                  <button
                    onClick={() => handleRoleChange(user._id, 'charity')}
                    className="btn btn-sm bg-yellow-500 text-white"
                  >
                    Make Charity
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
