import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  subjects: [],
  studyPlan: null,
  loading: false,
  error: null,
};

// Get Subjects
export const getUserSubjects = createAsyncThunk(
  "subject/getSubject",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/subject/getSubject",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.subjects;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch subjects"
      );
    }
  }
);

// Update Topic Progress
export const updateTopicProgress = createAsyncThunk(
  "subject/updateSubject",
  async ({ subjectId, topicName, increment }, { rejectWithValue }) => {
    try {
      // console.log("SubjectId : "+subjectId + " topicName : "+topicName );
      const res = await axios.put(
        "http://localhost:5000/api/subject/updateSubject",
        { subjectId, topicName, increment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return { subjectId, topicName, updatedTopic: res.data.updatedTopic };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update subject"
      );
    }
  }
);

// Add Subject
export const addSubject = createAsyncThunk(
  "subject/AddExam",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/subject/AddExam",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add subject"
      );
    }
  }
);

// Get Study Plan
export const getStudyPlan = createAsyncThunk(
  "subject/getStudyPlan",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("UserId", userId);
      const response = await axios.get(
        `http://localhost:5000/api/subject/getStudyPlan/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("response", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch study plan"
      );
    }
  }
);

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    clearSubjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Subjects
      .addCase(getUserSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(getUserSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Subject
      .addCase(addSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects.push(action.payload);
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Topic Progress
      .addCase(updateTopicProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTopicProgress.fulfilled, (state, action) => {
        state.loading = false;
        const { subjectId, topicName, updatedTopic } = action.payload;

        const subject = state.subjects.find((s) => s._id === subjectId);
        if (subject) {
          const topic = subject.topics.find((t) => t.name === topicName);
          if (topic) {
            topic.progress = updatedTopic.progress;
          }
        }
      })
      .addCase(updateTopicProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStudyPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudyPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.studyPlan = action.payload;
      })
      .addCase(getStudyPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubjectError } = subjectSlice.actions;
export default subjectSlice.reducer;
