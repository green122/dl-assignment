import React from 'react';
import PropTypes from 'prop-types';
import "./SurveyList.scss";
import Survey from "./Survey";

const SurveysList = ({surveys}) => {
  return (
    <div className="surveys-list">
      {surveys && surveys.map(survey => <Survey survey={survey}/>)}
    </div>
  );
};

SurveysList.propTypes = {
  surveys: PropTypes.arrayOf(PropTypes.object)
};

export default SurveysList;
