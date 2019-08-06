import React, { Component } from 'react'
import {connect} from 'react-redux';
import getFilterBurger from '../../getFilterBurger/getFilterBurger';
import AllBurgers from '../../components/AllBurgers/AllBurgers'

class TestingDashboard extends Component {
  componentDidMount(){
    this.props.dispatch({type:'INITIAL_STATE'})
  }
  componentWillUnmount(){
    console.log('unmount')
  }
  render() {
    return (
      <React.Fragment>
        <AllBurgers />
      </React.Fragment>
    )
  }
}

export default connect()(TestingDashboard);
