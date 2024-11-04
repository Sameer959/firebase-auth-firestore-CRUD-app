import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { fetchEmployeesAsync, deleteEmployeeAsync } from './employeeSlice'; 

const Dashboard = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployeesAsync());
  }, [dispatch]);

  const handleEdit = (id) => {
    const [employee] = employees.filter((employee) => employee.id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        dispatch(deleteEmployeeAsync(id));
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} setIsAuthenticated={setIsAuthenticated} />
          <Table employees={employees} handleEdit={handleEdit} handleDelete={handleDelete} />
        </>
      )}
      {isAdding && (
        <Add
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          selectedEmployee={selectedEmployee}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;