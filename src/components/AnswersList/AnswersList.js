import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => (
  <div>
    <ul className={classes.AnswersList}>
      { props.answers.map((answer, index) => {
        return (<AnswerItem
          answer={answer}
          key={index}
          answerClick={props.answerClick}
          state={props.state ? props.state[answer.id] : null}
        />);
      })}
    </ul>
  </div>
);

export default AnswersList;