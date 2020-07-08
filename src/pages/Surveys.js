import React, {Fragment} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {useFetching} from "../hooks/useFetching";
import SurveysList from "../components/SurveysList";

const Surveys = () => {
  const loadSurveysData = useFetching(async () => {
    const result = await axios.get('http://private-anon-3bbb60a48f-surveysmock.apiary-mock.com/api/surveys');
    return result.data;
  }, {}, []);
  return (
    <Fragment>
      {loadSurveysData.data && <SurveysList surveys={loadSurveysData.data.surveys}/>}
    </Fragment>
  );
};

Surveys.propTypes = {};

export default Surveys;
