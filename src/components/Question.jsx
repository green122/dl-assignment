import React, {Fragment} from 'react';
import './Question.scss';
import PropTypes from 'prop-types';

const Question = ({question, onSelectAnswer}) => {
  // console.log(question.options);
  return (
    <div className="question">
      <p>{question.title}</p>
      {question.options.map((option, index) =>
        <label className="option-label">
          <input name={question.id} onChange={e => onSelectAnswer(question.id, e.currentTarget.value)} value={option}
                 key={index}
                 type="radio"/>
          {option}
        </label>
      )}
    </div>
  );
};

Question.propTypes = {};

export default Question;
