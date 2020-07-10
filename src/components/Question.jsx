import React from 'react';
import './Question.scss';

const Question = ({question, onSelectAnswer}) => {
  return (
    <div className="question">
      <p className="question-title">{question.title}</p>
      {question.options.map((option, index) =>
        <div key={index} className="question-option">
          <input name={question.id} id={question.id + index}
                 onChange={e => onSelectAnswer(question.id, e.currentTarget.value)} value={option}
                 type="radio"/>
          <label htmlFor={question.id + index} className="option-label">
            {option}
          </label>
        </div>
      )}
    </div>
  );
};

export default Question;
