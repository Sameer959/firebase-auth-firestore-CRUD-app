import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firestore';
import Swal from 'sweetalert2';

const initialState = {
  employees: [],
  status: 'idle',
  error: null,
};

export const fetchEmployeesAsync = createAsyncThunk(
  'employees/fetchEmployeesAsync',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employees = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return employees;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEmployeeAsync = createAsyncThunk(
  'employees/addEmployeeAsync',
  async (newEmployee, { rejectWithValue }) => {
    try {
      await addDoc(collection(db, 'employees'), newEmployee);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${newEmployee.firstName} ${newEmployee.lastName}'s data has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
      return newEmployee;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        showConfirmButton: true,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  'employees/updateEmployeeAsync',
  async (employee, { rejectWithValue }) => {
    const { id, firstName, lastName, email, salary, date } = employee;
    try {
      await setDoc(doc(db, 'employees', id), {
        firstName,
        lastName,
        email,
        salary,
        date,
      });

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${firstName} ${lastName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });

      return employee;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        showConfirmButton: true,
      });
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  'employees/deleteEmployeeAsync',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'employees', id));

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: `Employee data has been deleted.`,
        showConfirmButton: false,
        timer: 1500,
      });

      return id; 
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        showConfirmButton: true,
      });
      return rejectWithValue(error.message);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployeesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addEmployeeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees.push(action.payload);
      })
      .addCase(addEmployeeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateEmployeeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        );
      })
      .addCase(updateEmployeeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      })
      .addCase(deleteEmployeeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;