import { useState, useEffect } from "react";
import axios from "axios";


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
        setState({
          ...state,
          appointments
        });
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
        setState({
          ...state,
          appointments
        });
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}