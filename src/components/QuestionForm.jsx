import React, {useCallback, useEffect, useRef, useState} from 'react';
import Question from "./Question";


export function convertQuestionsToHashMap(array) {
  return array.reduce((acc, question) => {
    acc[question.id] = '';
    return acc;
  }, {})
}


const QuestionForm = ({survey, onSubmit, isSubmitting}) => {
  const [questionsState, setQuestion] = useState(convertQuestionsToHashMap(survey.questions));
  const refToList = useRef(null);

  const answeredQuestions = Object.values(questionsState).filter(Boolean);
  const isValid = Boolean(answeredQuestions.length) && answeredQuestions.length === survey.questions.length;

  useEffect(() => {
    const listDOM = refToList.current;
    if (!listDOM) {
      return;
    }
    listDOM.scrollIntoView({behavior: 'smooth'});
  }, [answeredQuestions.length])

  const onSelectAnswer = useCallback((questionId, value) => setQuestion(prevState => ({
    ...prevState, [questionId]: value
  })), []);

  return (
    <div>
      <h3 className="survey-title">{survey.title}</h3>
      <p className="survey-tagline">{survey.tagline}</p>
      {survey.questions.slice(0, answeredQuestions.length + 1).map(
        question => <Question key={question.id} question={question} onSelectAnswer={onSelectAnswer}
                              checkedAnswer={questionsState[question.id]}/>
      )}
      <div ref={refToList}/>
      {isValid && !isSubmitting &&
      <button className="btn btn-submit" onClick={() => onSubmit(questionsState)}>
        Submit answers
      </button>}
      {isSubmitting && <p>...Submitting. Please wait...</p>}
    </div>
  );
};

export default QuestionForm;
