import React from 'react';
import CalendarComponent from '../../components/Calendar/Calendar.components';
import DashboardLayout from '../../layouts/Dashboard/Dashboard.layout';

function CalendarPage() {
  return (
    <DashboardLayout child={
        <div>
            <CalendarComponent />
        </div>} />
  )
}

export default CalendarPage