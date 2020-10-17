import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = props => {
  const rightAnswers = Object.keys(props.results).reduce((total, key) => {
console.log(props.results)
    if (props.results[key] === 'success') {
      ++total;
    }
    return total;
  }, 0);

  return <div className={classes.FinishedQuiz}>
    <ul>

      {
        props.quiz.map((quiz, index) => {
          console.log(props, quiz);
          const cls = [
            'fa',
            props.results[quiz.id] === 'error' ? 'fa-times ' + classes.error : 'fa-check ' + classes.success
          ];

          return (
            <li key={index}>
              <strong>
                {index + 1}.&nbsp;
              </strong>
              {
                quiz.question
              }
              <i className={cls.join(' ')}/>
            </li>
          )
        })
      }

    </ul>
    <p>Правильно {rightAnswers} из {props.quiz.length}</p>

    <div>
      <Button onclick={props.onRetry}
              type='primary'
      >
        Retry
      </Button>

      <Link to={'/'} >
        <Button type='success' onclick={() => {
          props.clearQuizState();
        }}>
          Go to list with all tests
        </Button>
      </Link>

    </div>

    <h2> You have been done the questions</h2>
  </div>
};

export default FinishedQuiz;