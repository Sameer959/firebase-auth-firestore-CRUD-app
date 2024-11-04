import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { logoutAsync } from '../../components/Login/authSlice'; // Use async thunk

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutAsync())
          .unwrap()
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: error,
              showConfirmButton: true,
            });
          });
      }
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;