import React, {Fragment} from 'react';
import axios from 'axios';
import {useFetching} from "../hooks/useFetching";
import SurveysList from "../components/SurveysList";
import {surveysUrl} from "../constants/apiRoutes";

const Surveys = () => {
  const loadSurveysData = useFetching(async () => {
    const result = await axios.get(surveysUrl);
    return result.data;
  }, {}, []);
  return (
    <Fragment>
      {loadSurveysData.data && <SurveysList surveys={loadSurveysData.data.surveys}/>}
    </Fragment>
  );
};

export default Surveys;
