import React from 'react';
import { connect } from 'react-redux'
import Counter2 from "./Counter2/Counter2";
import {addNumber, asyncAdd, subNumber} from "../../redux/actions/actions";

class Counter extends React.Component {
  style = {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  state = {
    actionNumber: 0
  };

  changeActionNumber = (val) => {
    this.setState({
      actionNumber: +val
    })
  }

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
              counter: {this.props.counter}
            </p>
          </div>

          <button onClick={() => {
            this.props.onAdd(this.state.actionNumber)
          }}>
            increment
          </button>

          <button onClick={() => {
            this.props.onSub(this.state.actionNumber)
          }}>
            decrement
          </button>
          <div>
            <button onClick={() => {
              this.props.onAsyncAdd(100)
            }}>
              add number 100 async
            </button>
          </div>
          <div>
            <Counter2></Counter2>
          </div>
        </div>

      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    counter: state.counter.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: (payload) => dispatch(addNumber(payload)),
    onSub: (payload) => dispatch(subNumber(payload)),
    onAsyncAdd: (payload) => dispatch(asyncAdd(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);