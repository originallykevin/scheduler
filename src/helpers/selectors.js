
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


export function getInterview(state, interview) {

  // returns null if no interview is booked
  if (!interview) {
    return null;
  }
  // student name
  const student = interview.student
  // console.log(student)
  // specific interviewer 
  const interviewer = state.interviewers[interview.interviewer]
  // console.log(interviewer)

  return {student, interviewer}
}

export function getInterviewersForDay(state, day) {
  // returns an empty array when the interviewer data is empty
  if (state.days.length === 0) {
    return [];
  }
  
  // obj for stats.interviewers
  const interviewerObj = state.days.find(d => d.name === day);
  // returns an empty array when the day is not found
  if (!interviewerObj) {
    return [];
  }

  return interviewerObj.interviewers.map(interviewerid => state.interviewers[interviewerid]);
}