import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEmployeeAsync } from './employeeSlice'; 

const Add = ({ setIsAdding }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {firstName: '',lastName: '',email: '' ,salary: '',Date: ''},
  });

  const onSubmit = (data) => {
    dispatch(addEmployeeAsync(data))
      .then(() => {
        setIsAdding(false); 
        reset(); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add Employee</h2>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            {...register('firstName', { required: 'First name is required',maxLength:20})}
          />
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            {...register('lastName', { required: 'Last name is required',maxLength:20 })}
          />
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register('email', {required: 'Email is required',pattern: {value: /^\S+@\S+$/i,
                message: 'Invalid email address'},
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Salary</label>
          <input type="number"{...register('salary', {required: 'Salary is required',
              min: {value: 0,message: 'Salary must be a positive number'},
            })}
          />
          {errors.salary && <p className="error">{errors.salary.message}</p>}
        </div>

        <div className="form-group">
          <label>Date of Joining</label>
          <input
            type="date"
            {...register('date', { required: 'Date of joining is required' })}
          />
          {errors.date && <p className="error">{errors.date.message}</p>}
        </div>

        <button type="submit" className="btn btn-success">
          Add Employee
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsAdding(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Add;