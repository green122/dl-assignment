import React, {useEffect, useLayoutEffect, useReducer, useRef} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useFetching} from "../hooks/useFetching";
import Question from "../components/Question";

import "./SurveyDetails.scss";

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
  const refToList = useRef(null);

  const {id} = match.params;

  const surveyDetailsData = useFetching(async () => {
    const result = await axios.get(`https://private-anon-3bbb60a48f-surveysmock.apiary-mock.com/api/surveys/${id}`);
    const {survey} = result.data;
    dispatch({type: 'set_questions_map', payload: survey.questions})
    return survey;
  }, {}, [dispatch]);

  const surveySubmit = useFetching(async () => {
    if (!state.submit) {
      return;
    }
    const completion = Object.entries(state.questions).map(([question_id, value]) => ({question_id, value}));
    const result = await axios.post(`https://private-anon-3bbb60a48f-surveysmock.apiary-mock.com/api/surveys/${id}/completions`, {completion});
    return true;
  }, false, [dispatch, state.submit]);

  // const surveySubmit = {data: true};


  const onSelectAnswer = (questionId, value) => dispatch({
    type: 'set_questions_answer',
    payload: {id: questionId, value}
  });

  const questions = surveyDetailsData.data?.questions || [];
  const answeredQuestions = Object.values(state.questions).filter(Boolean);
  const isValid = Boolean(answeredQuestions.length) && answeredQuestions.length === questions.length;

  useEffect(() => {
    const listDOM = refToList.current;
    if (!listDOM) {
      return;
    }
    listDOM.scrollIntoView({behavior: 'smooth'});
  }, [answeredQuestions.length])


  return (
    <div>
      {!surveySubmit.data && surveyDetailsData.data &&
      <div>
        <h3 className="survey-title">{surveyDetailsData.data.title}</h3>
        <p className="survey-tagline">{surveyDetailsData.data.tagline}</p>
        {questions.slice(0, answeredQuestions.length + 1).map(
          question => <Question key={question.id} question={question} onSelectAnswer={onSelectAnswer}
                                checkedAnswer={state.questions[question.id]}/>
        )}
        <div ref={refToList}/>
        {isValid && <button className="btn btn-submit" onClick={() => dispatch({type: 'submit', payload: true})}>
          Submit answers
        </button>}
      </div>}
      {surveySubmit.data && <div className="submit-success">
        Thanks for answering the survey!
        <NavLink to="/">
          <button className="btn btn-link">Return to main page</button>
        </NavLink>
      </div>}
    </div>
  );
};

SurveysDetails.propTypes = {};

export default SurveysDetails;
