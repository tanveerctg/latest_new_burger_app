import React from 'react'
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// class PrivateRoute extends Component {
//   state={
//     id:null
//   }
//   componentDidMount=()=>{
//     let getId=this.props.id;
//     console.log('getId',getId)
//     this.setState({id:getId});
//   }
//   render() {
//     console.log(this.state.id);
//     console.log('asd')
//     let route;
//     let id=this.props.id;
   
//     { 
//       route=<Route path={this.props.path} component={(props)=>{
//         if(this.state.id ){
//           const Component=this.props.component;
//           return <Component {...props}/>
//         }else{
//           <Redirect to="/" />
//         }
//       }
//       }/>
   
//     }
//     console.log(route);
//     return route;
//   }
// }
// const mapStateToProps=state=>{
//   return{
//     id:state.authReducer.id
//   }
// }

// export default connect(mapStateToProps)(PrivateRoute);

export const PrivateRoute=({path,component:Component,id,...rest})=>{
  // let userid=!!localStorage.getItem('id');
  // console.log(id)
  // console.log(id)
  //  return <Route path={path} {...rest} component={(props)=>{
  //   if(userid){
  //     return <Component {...props}/>
  //   }else{
  //     return <Redirect to="/" />
  //   }
  // }
  // }/>
  if(id){
    return <Route path={path}  component={Component} />
  }else{
    return <Redirect to="/" />
  }
  
};
const mapStateToProps=state=>{
  return{
    id:state.authReducer.id
  }
}

export default connect(mapStateToProps)(PrivateRoute);