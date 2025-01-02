import { useState } from 'react';
import { useUsers, useUpdateUser } from '../hooks/api-hooks';
import { User } from '../types/api';

export const UserList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useUsers(page);
  const updateUser = useUpdateUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleUpdateUser = (user: Partial<User>) => {
    updateUser.mutate(user, {
      onSuccess: (response) => {
        console.log('User updated:', response.data);
      },
      onError: (error) => {
        console.error('Update failed:', error.message);
      },
    });
  };

  return (
    <div>
      {data?.data.data.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button
            onClick={() => handleUpdateUser({ id: user.id, name: 'New Name' })}
          >
            Update
          </button>
        </div>
      ))}
      <div>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
};
