import React from 'react';
import "./Survey.scss";

const Survey = ({survey}) => {
  return (
    <a href={`/survey/${survey.id}`}>
      <div className="survey-card">
        <p className="survey-title">{survey.title}</p>
        <p className="survey-tagline">{survey.tagline}</p>
      </div>
    </a>
  );
};

export default Survey;
