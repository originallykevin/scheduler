
export function getAppointmentsForDay(state, day) {
  // returns an empty array when the days data is empty
  if (state.days.length === 0) {
    return [];
  }
  
  // obj for stats.days
  const dayObj = state.days.find(d => d.name === day);
  // returns an empty array when the day is not found
  if (!dayObj) {
    return [];
  }

  return dayObj.appointments.map(appointmentid => state.appointments[appointmentid]);
}