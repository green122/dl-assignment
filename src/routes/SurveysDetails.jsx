import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import QuestionForm from "../components/QuestionForm";

import "./SurveyDetails.scss";
import {surveysDetailsUrl} from "../constants/apiRoutes";
import Error from "../components/Error";

const SurveysDetails = ({match}) => {
  const [submitQuestions, setSubmit] = useState(null);
  const {id} = match.params;

  const surveyDetailsData = useFetching(async () => {
    const result = await axios.get(surveysDetailsUrl(id));
    const {survey} = result.data;
    return survey;
  }, null, []);

  const surveySubmit = useFetching(async () => {
    if (!submitQuestions) {
      return;
    }
    const completion = Object.entries(submitQuestions).map(([question_id, value]) => ({question_id, value}));
    await axios.post(`https://private-anon-3bbb60a48f-surveysmock.apiary-mock.com/api/surveys/${id}/completions`, {completion});
    return true;
  }, false, [submitQuestions]);

  return (
    <div>
      {surveyDetailsData.isLoading && <p>...Loading. Please wait...</p>}
      {surveyDetailsData.data && !surveySubmit.data &&
      <QuestionForm
        survey={surveyDetailsData.data}
        onSubmit={setSubmit}
        isSubmitting={surveySubmit.isLoading}
      />}
      {surveySubmit.data && <div className="submit-success">
        Thanks for answering the survey!
        <Link to="/">
          <button className="btn btn-link">Return to main page</button>
        </Link>
      </div>}
      <Error error={surveySubmit.error || surveyDetailsData.error}/>
    </div>
  );
};

export default SurveysDetails;
