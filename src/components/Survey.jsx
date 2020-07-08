import React from 'react';
import PropTypes from 'prop-types';
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

Survey.propTypes = {};

export default Survey;
