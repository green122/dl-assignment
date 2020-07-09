import React, {Fragment} from 'react';
import './Question.scss';
import PropTypes from 'prop-types';

const Question = ({question, onSelectAnswer}) => {
  return (
    <div className="question">
      <p className="question-title">{question.title}</p>
      {question.options.map((option, index) =>
        <div className="question-option">
          <input name={question.id} id={question.id + index}
                 onChange={e => onSelectAnswer(question.id, e.currentTarget.value)} value={option}
                 key={index}
                 type="radio"/>
          <label for={question.id + index} className="option-label">
            {option}
          </label>
        </div>
      )}
    </div>
  );
};

Question.propTypes = {};

export default Question;
