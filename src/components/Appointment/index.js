import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE"
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM"
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

  function onDelete(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETE)
    props.cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY)
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVE &&
        <Status message='Saving'/>}

      {mode === DELETE &&
        <Status message='Deleting' />}

      {mode === CONFIRM &&
        <Confirm 
          message='Would you like to delete?'
          onCancel={back}
          onConfirm={onDelete}
          />}

      {mode === SHOW && (
        <Show
          student={props.interview?.student}
          interviewer={props.interview?.interviewer}
          onDelete={() => transition(CONFIRM)}
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