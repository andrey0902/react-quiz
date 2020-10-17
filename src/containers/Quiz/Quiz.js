import React, { Component } from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {clearQuizState, fetchQuiz, quizAnswerClick, retryQuiz} from "../../redux/actions/quiz-actions";

class Quiz extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchQuiz(id);
  }

  componentWillUnmount() {
    this.props.clearQuizState();
  }

  onAnswerClickHandler = (answerId) => {
    this.props.quizAnswerClick(answerId);
  };


  retryHandler = () => {
    this.props.retryQuiz();
  };

  clearQuizState = () => {
    this.props.clearQuizState();
  };

  render() {

    return (
      <div className={classes.Quiz}>

        <div className={classes.QuizWrapper}>
          <h1>Please give your answers for all questions</h1>

          {
            this.props.loading || !this.props.quiz
            ? <Loader></Loader>
            : this.props.isFinished
              ? <FinishedQuiz results={this.props.results}
                              quiz={this.props.quiz}
                              onRetry={this.retryHandler}
                              clearQuizState={this.clearQuizState}
              />
              : <ActiveQuiz answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            activeQuestion={this.props.activeQuestion + 1}
                            length={this.props.quiz.length}
                            answerClick={this.onAnswerClickHandler}
                            state={this.props.answerState}
              />

          }

        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    error: state.quiz.error,
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuiz: id => dispatch(fetchQuiz(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
    clearQuizState: () => dispatch(clearQuizState())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Quiz);