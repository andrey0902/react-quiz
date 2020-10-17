import React from 'react';
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/Input/Input";
import {auth} from "../../redux/actions/auth-actions";
import {connect} from "react-redux";


class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Entered correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Entered correct Password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  getAuthData = (isLogin = false) => {
    return {
      isLogin,
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
    };
  };

  onSignUpHandler = () => {
    this.props.auth(this.getAuthData());
  };

  onLSignInHandler = () => {
    this.props.auth(this.getAuthData(true));
  };

  validateControl(value, validParams) {
    if (!validParams) {
      return true;
    }
    const email = /^([a-z0-9_-]+\.)*[a-z0-9_+0-9-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    let isValid = true;

    if (validParams.required) {
      isValid = `${value}`.trim() !== '' && isValid;
    }

    if (validParams.email) {
      isValid = email.test(value);
    }

    if (validParams.minLength) {
      isValid = `${value}`.trim().length > validParams.minLength
    }
    return isValid;
  }

  onChangeHandler = (event, controlName) => {

    const formControls = { ...this.state.formControls};
    const control = { ...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((key) => {
      isFormValid = formControls[key].valid && isFormValid;
    });

    this.setState({formControls, isFormValid});
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  renderInputs() {
    return Object.keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName];
        return(
          <Input type={control.type}
                 key={index}
                 label={control.label}
                 value={control.value}
                 showPasswordIcon={control.type === 'password'}
                 valid={control.valid}
                 touched={control.touched}
                 errorMessage={control.errorMessage}
                 shouldValidate={!!control.validation}
                 onChange={event => this.onChangeHandler(event, controlName)}
          />
        )
      });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>
            Log In
          </h1>
          <form onSubmit={this.onSubmitHandler}
                className={classes.AuthForm}
          >
            {
              this.renderInputs()
            }
            <Button type={'success'}
                    onclick={this.onLSignInHandler}
                    disabled={!this.state.isFormValid}
            >
              Sign In
            </Button>

            <Button type={'primary'}
                    onclick={this.onSignUpHandler}
                    disabled={!this.state.isFormValid}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (data) => dispatch(auth(data))
  }
}

export default connect(null, mapDispatchToProps)(Auth);