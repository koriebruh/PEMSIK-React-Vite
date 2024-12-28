import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

export const fetchStudents = createAsyncThunk(
    'students/fetchStudents',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error('Token not found');
        }

        try {
            const response = await axios.get('http://demo-api.syaifur.io/api/mahasiswa', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.code === 200) {
                return response.data.data;
            }
            return rejectWithValue(response.data.message);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addStudent = createAsyncThunk(
    'students/addStudent',
    async (newStudent, { rejectWithValue }) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error('Token not found');
        }

        try {
            const response = await axios.post(
                'http://demo-api.syaifur.io/api/mahasiswa',
                {
                    ...newStudent,
                    umur: parseInt(newStudent.umur, 10)
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.code === 201) {
                return response.data.data;
            }
            return rejectWithValue(response.data.message);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateStudent = createAsyncThunk(
    'students/updateStudent',
    async ({ id, changes }, { rejectWithValue }) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error('Token not found');
        }

        try {
            const response = await axios.put(
                `http://demo-api.syaifur.io/api/mahasiswa/${id}`,
                changes,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.code === 200) {
                return { id, changes };
            }
            return rejectWithValue(response.data.message);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteStudent = createAsyncThunk(
    'students/deleteStudent',
    async (id, { rejectWithValue }) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error('Token not found');
        }

        try {
            const response = await axios.delete(
                `http://demo-api.syaifur.io/api/mahasiswa/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.code === 200) {
                return id;
            }
            return rejectWithValue(response.data.message);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const studentSlice = createSlice({
    name: 'students',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Students
            .addCase(fetchStudents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Add Student
            .addCase(addStudent.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            // Update Student
            .addCase(updateStudent.fulfilled, (state, action) => {
                const { id, changes } = action.payload;
                const existingStudent = state.data.find(student => student.id === id);
                if (existingStudent) {
                    Object.assign(existingStudent, changes);
                }
            })
            // Delete Student
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.data = state.data.filter(student => student.id !== action.payload);
            });
    }
});

export default studentSlice.reducer;