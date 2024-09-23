import React from 'react';
import AvailabilitySettings from './availability-settings';
import AvailableSchedules from './available-schedules';
import BookedClasses from './booked-classes';

const Schedule: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Professional Dashboard</h1>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <AvailabilitySettings />
          <AvailableSchedules />
        </div>

        {/* Right Column */}
        <div>
          <BookedClasses />
        </div>
      </div>
    </div>
  );
};

export default Schedule;

