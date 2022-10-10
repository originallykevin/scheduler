import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE"
  // import useVisualMode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE) // 

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVE &&
        <Status message='..saving'/>}

      {mode === SHOW && (
        <Show
          student={props.interview?.student}
          interviewer={props.interview?.interviewer}
        />)}

      {mode === CREATE && (
        < Form
          interviewers={props.interviewers} // from Application.js 'interviewers={dailyInterviewers}'
          onSave={save}
          onCancel={back}
        />)}
    </article>
  );
}