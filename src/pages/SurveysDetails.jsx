import React, {useReducer} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {useFetching} from "../hooks/useFetching";
import Question from "../components/Question";

const questionsReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'set_questions_map':
      return {
        ...state, questions: payload.reduce((acc, question) => {
          acc[question.id] = '';
          return acc;
        }, {})
      }
    case 'set_questions_answer':
      return {...state, questions: {...state.questions, [payload.id]: payload.value}}
    case 'submit':
      return {...state, submit: payload}
  }
}


const SurveysDetails = ({match}) => {
  const [state, dispatch] = useReducer(questionsReducer, {submit: false, questions: {}});

  const {id} = match.params;

  const surveyDetailsData = useFetching(async () => {
    const result = await axios.get(`https://private-anon-3bbb60a48f-surveysmock.apiary-mock.com/api/surveys/${id}`);
    dispatch({type: 'set_questions_map', payload: result.data.survey.questions})
    return result.data.survey;
  }, {}, [dispatch]);

  const surveySubmit = useFetching(async () => {
    if (!state.submit) {
      return;
    }
    const completion = Object.entries(state.questions).map(([question_id, value]) => ({question_id, value}));
    const result = await axios.post(`https://private-anon-3bbb60a48f-surveysmock.apiary-mock.com/api/surveys/${id}/completions`, {completion});
    return true;
  }, false, [dispatch, state.submit]);

  const onSelectAnswer = (questionId, value) => dispatch({
    type: 'set_questions_answer',
    payload: {id: questionId, value}
  });

  const isValid = Object.values(state.questions).every(Boolean);
  return (
    <div>
      {!surveySubmit.data &&
      <div>
        {(surveyDetailsData?.data?.questions || []).map(
          question => <Question key={question.id} question={question} onSelectAnswer={onSelectAnswer}
                                checkedAnswer={state.questions[question.id]}/>
        )}
        <button disabled={!isValid} onClick={() => dispatch({type: 'submit', payload: true})}>Submit</button>
      </div>}
      {surveySubmit.data && <div>Submitted</div>}
    </div>
  );
};

SurveysDetails.propTypes = {};

export default SurveysDetails;
