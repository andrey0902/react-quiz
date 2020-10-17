import React from 'react';
import { connect } from 'react-redux';
import {addNumberCounter} from "../../../redux/actions/actions";

class Counter2 extends React.Component {
  style = {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  state = {
    actionNumber: 5
  };
  changeActionNumber = (val) => {
    this.setState({
      actionNumber: +val
    })
  };

  render() {
    return (
      <div style={this.style}>
        <div style={{display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
          <div style={{flexGrow: 1}}>

            <input type='number' value={this.state.actionNumber} onChange={(event) => {
              this.changeActionNumber(event.target.value)
            }}/>

            <p>
              Counter2: {this.props.counter}
            </p>
          </div>

          <button onClick={() => {
            this.props.addNumber(this.state.actionNumber)
          }}>
            increment
          </button>

          <button onClick={() => {
            this.props.addNumber(-this.state.actionNumber)
          }}>
            decrement
          </button>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    counter: state.counter2.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNumber: (number) => dispatch(addNumberCounter(number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter2)