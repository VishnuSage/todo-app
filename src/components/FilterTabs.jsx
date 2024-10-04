// src/components/FilterTabs.jsx
import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/todoSlice'; // Updated action

const FilterTabs = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.todos.filter);

  const handleTabChange = (event, newValue) => {
    dispatch(setFilter(newValue)); // Dispatch setFilter action
  };

  return (
    <Tabs
      value={filter}
      onChange={handleTabChange}
      variant="fullWidth"
      sx={{ mt: 2 }}
    >
      <Tab label="All" value="all" />
      <Tab label="Active" value="active" />
      <Tab label="Completed" value="completed" />
    </Tabs>
  );
};

export default FilterTabs;
