import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Question = ({question, onSelectAnswer}) => {
  // console.log(question.options);
  return (
    <div>
      <p>{question.title}</p>
      {question.options.map((option, index) =>
        <Fragment>
          <label>
            <input name={question.id} onChange={e => onSelectAnswer(question.id, e.currentTarget.value)} value={option}
                   key={index}
                   type="radio"/>
            {option}
          </label>
        </Fragment>
      )}
    </div>
  );
};

Question.propTypes = {};

export default Question;
