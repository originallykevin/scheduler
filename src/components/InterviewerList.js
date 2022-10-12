import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList(props) {
  const { onChange, value } = props;

  const InterviewerListArray = props.interviewers.map((interviewer) => {
    return (
      < InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewerListArray}
      </ul>
    </section>
  );
}