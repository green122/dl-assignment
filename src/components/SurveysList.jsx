import React from 'react';
import "./SurveyList.scss";
import Survey from "./Survey";

const SurveysList = ({surveys}) => {
  return (
    <div className="surveys-list">
      {surveys && surveys.map(survey => <Survey key={survey.id} survey={survey}/>)}
    </div>
  );
};

export default SurveysList;
