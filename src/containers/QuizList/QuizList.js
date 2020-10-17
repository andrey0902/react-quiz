import React from 'react';
import classes from './QuizList.module.css';
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from 'react-redux';
import {fetchQuizes} from "../../redux/actions/quiz-actions";

class QuizList extends React.Component {


  renderQuizList() {
    return this.props.quizList.map((quiz) => {
      return (
        <li
            key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  };

  componentDidMount () {
    this.props.fetchQuizes();
  }

  render() {
    console.log(this.props)
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>

          {
            this.props.loading && this.props?.quizList.length !== 0
            ? <Loader />
            :   <ul>
                {
                  this.renderQuizList()
                }
              </ul>
          }


        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quizList: state.quiz.quizList,
    loading: state.quiz.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);