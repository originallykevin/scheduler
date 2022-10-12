import { useState, useEffect } from "react";
import axios from "axios";

const updateSpots = function(state, appointments) {

  // find day object
  const dayObj = state.days.find(d=> d.name === state.day);

  let spots = 0;
  for (const id of dayObj.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spots++;
    }
  }
  
  // new day object
  const day = { ...dayObj, spots };

  // new array including the new day
  const days = state.days.map(d => d.name === state.day ? day : d);

  return days;
};

export default function useApplicationData(props) {
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // update the appointment with the interview so saved data is not lost
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {

        // new array with updated spots
        const days = updateSpots(state, appointments);
        setState(prev => ({
          ...prev,
          appointments, 
          days
        }));
      });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, { interview: interview })
      .then(() => {

        // new array with updated spots
        const days = updateSpots(state, appointments);
        setState(prev => ({
          ...prev,
          appointments,
          days
        }));
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}