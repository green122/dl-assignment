import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {useFetching} from "../hooks/useFetching";
import Question from "../components/Question";

const SurveysDetails = ({match}) => {
  const {id} = match.params;
  const surveyDetailsData = useFetching(async () => {
    const result = await axios.get(`https://private-anon-3bbb60a48f-surveysmock.apiary-mock.com/api/surveys/${id}`);
    return result.data;
  }, {}, []);
  console.log(surveyDetailsData.data);
  return (
    <div>
      {(surveyDetailsData?.data?.survey?.questions || []).map(
        question => <Question key={question.id} question={question}/>
      )}
    </div>
  );
};

SurveysDetails.propTypes = {};

export default SurveysDetails;
