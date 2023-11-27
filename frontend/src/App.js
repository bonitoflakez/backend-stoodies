import { data } from 'autoprefixer';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/get');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (name) => {
    try {
      const response = await fetch('http://localhost:3000/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.name !== name));
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = async (name) => {
    const new_name = prompt('Enter the new name:');
    if (new_name === null) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, new_name }),
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.name === name ? { ...user, name: new_name } : user
          )
        );
      } else {
        console.error('Error updating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleAddName = async () => {
    const name = prompt('Enter the new name:');
    if (name === null) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setUsers((prevUsers) => [...prevUsers, { name }]);
      } else {
        console.error('Error adding user:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className='text-2xl font-bold text-center'>Hewwo :3</h1>

      <div className='border mx-12 my-10 p-4 rounded shadow'>
        <div className='flex justify-center gap-2'>
          <button
            className='rounded bg-blue-500 hover:bg-blue-600 px-2 py-1'
            onClick={handleAddName}
          >
            Add Name
          </button>
        </div>

        <div className="mx-12 my-10 grid grid-cols-8 gap-8">
          {users.map((user, index) => (
            <div key={index} className='border rounded-sm shadow p-2 text-center'>
              <div>{user.name}</div>
              <div className='flex justify-center gap-2 mt-2'>
                <button
                  className='rounded bg-green-500 hover:bg-green-600 px-2 py-1'
                  onClick={() => handleUpdate(user.name)}
                >
                  Update
                </button>
                <button
                  className='rounded bg-red-500 hover:bg-red-600 px-2 py-1'
                  onClick={() => handleDelete(user.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;