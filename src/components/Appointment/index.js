import React from 'react';
import "./styles.scss";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  // import useVisualMode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVE); // 

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(err => transition(ERROR_SAVE, true));
  }

  function onDelete(event) {
    // const interview = {
    //   student: name,
    //   interviewer
    // };
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVE &&
        <Status message='Saving' />}

      {mode === DELETE &&
        <Status message='Deleting' />}

      {mode === CONFIRM && (
        <Confirm
          message='Would you like to delete?'
          onCancel={back}
          onConfirm={onDelete}
        />)}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />)}

      {mode === EDIT && (
        < Form
          student={props.interview?.student}
          interviewer={props.interview.interviewer.id} // .id to keep the current interviewer
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />)}

      {mode === CREATE && (
        < Form
          interviewers={props?.interviewers} // from Application.js 'interviewers={dailyInterviewers}'
          onSave={save}
          onCancel={back}
        />)}

      {mode === ERROR_SAVE && (
        < Error
          message='Error. Please try again'
          onClose={back}
        />)}

      {mode === ERROR_DELETE && (
        < Error
          message='Error. Please try again'
          onClose={back}
        />)}
    </article>
  );
}