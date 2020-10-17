import React from 'react';
import classes from './QuizCreator.module.css';

import Button from "../../components/UI/Button/Button";
import Input from "../../components/Input/Input";
import {createControl, validateControl, validateForm} from "../../core/formFramework";
import Auxiliary from "../../components/UI/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import QuizService from "../../core/quiz.service";
import { connect } from "react-redux";
import {addQuestionsToQuiz, createQuiz} from "../../redux/actions/quiz-create-actions";

function createOptionControl(optionName, id = null) {
  const config = {
    valid: false,
    label: optionName,
    errorMessage: 'Question can not be black',
  };
  if (id) {
    config.id = id;
  }
  return createControl(config, {required: true, minLength: 2})
}

function createFormControls() {
  return {
    question: createOptionControl('Enter title of the question'),
    options1: createOptionControl('Option 1', 1),
    options2: createOptionControl('Option 2', 2),
    options3: createOptionControl('Option 3', 3),
    options4: createOptionControl('Option 4', 4),
  };
}

class QuizCreator extends React.Component {

  getDefaultState() {
    return {
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false,
    }

  }

  state = {
    ...this.getDefaultState()
  };

  renderControls = () => {
    return (
      Object.keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName];
        return (
          <Auxiliary key={index}>
            <Input key={index}
                   label={control.label}
                   value={control.value}
                   valid={control.valid}
                   touched={control.touched}
                   errorMessage={control.errorMessage}
                   shouldValidate={!!control.validation}
                   onChange={event => this.onChangeHandler(event, controlName)}
            />
            {index === 0 ? <hr/>: null}
          </Auxiliary>
        )
      })
    );
  };

  onChangeHandler = (event, controlName) => {

    const formControls = { ...this.state.formControls};
    const control = { ...formControls[controlName]};
    control.touched = true;
    control.value = event.target.value;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = validateForm(formControls);

    this.setState({formControls, isFormValid});
};

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = () => {

    const { question, options1, options2, options3, options4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: options1.value, id: options1.id},
        { text: options2.value, id: options2.id},
        { text: options3.value, id: options3.id},
        { text: options4.value, id: options4.id},
      ]
    };

    this.props.addQuestionsToQuiz(questionItem);

    this.setState({
      ...this.getDefaultState()
    });

  };


  createQuizHandler = () => {
    this.props.createQuiz()
  };

  selectChangeHandler = (event) => {

    this.setState({
      rightAnswerId: +event.target.value
    });
  };

  render() {
    if (this.props.isCreated) {
      this.setState({
        ...this.getDefaultState()
      });
    }

    const select = <Select
      label={'Choose the right answer'}
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
      ]}
    />

    return (
      <div className={classes.QuizCreator}>

        <div>
          <h1>Quiz creator</h1>
          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            { select }

            <Button type={'primary'}
                    onclick={this.addQuestionHandler}
                    disabled={!this.state.isFormValid}
            >Add Question</Button>

            <Button onclick={() => {
              this.createQuizHandler()
            }}
                    disabled={this.props.quiz.length === 0}
                    type={'success'}
            >
              Create Quiz
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export function mapStateToProps(state) {
  return {
    quiz: state.quizCreate.quiz,
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    addQuestionsToQuiz: (questionItem) => dispatch(addQuestionsToQuiz(questionItem)),
    createQuiz: () => dispatch(createQuiz()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);