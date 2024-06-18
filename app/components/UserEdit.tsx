import React from 'react';
import Header from './Header';
import UserDetailsForm from './UserDetails';

const UserEditForm = () => {
  return (
    <div>
      <Header />
      <main>
        <UserDetailsForm />
      </main>
    </div>
  );
};

export default UserEditForm;