import React, { Component } from "react";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import Loader from "../../components/UI/Loader/Loader";
import ContactData from "../../components/ContactData/ContactData";
import { connect } from "react-redux";
import { getAllOrders } from "../../store/Actions/get_All_Orders";
import classes from "./Checkout.module.scss";
import { database } from "../../firebase/firebase";
import moment from "moment";
class Checkout extends Component {
  state = {
    loading: false,
    ingredients: "",
    totalPrice: 0,
    message: false,
    contactInfo: "",
    error: false,
    selectedOption: null,
    customizedOrder: null
  };
  componentWillMount() {
    if (!!this.props.customizedOrder) {
      this.setState({
        ingredients: this.props.ingredients,
        totalPrice: this.props.totalPrice,
        customizedOrder: this.props.customizedOrder
      });
    } else {
      const totalPrice = this.props.cartItems.reduce((total, itm) => {
        return total + itm.price;
      }, 0);
      this.setState({ totalPrice: totalPrice });
    }
  }
  successMessage = () =>
    this.state.message ? (
      <p
        style={{
          background: "#c9f658",
          color: "#36622b",
          display: "inline-block",
          padding: "10px",
          marginTop: "3rem"
        }}
      >
        Sir Your order is successfully sent.We will try to deliver the product
        as soon as Possible
      </p>
    ) : null;
  //FROM ContactData component
  contactHandler = data => {
    this.setState({ contactInfo: data });
  };
  //FROM ContactData component
  buy = () => {
    this.setState({ loading: true });
    let data;
    if (!!this.props.customizedOrder) {
      data = {
        ingredients: this.state.ingredients,
        totalPrice: this.state.totalPrice,
        CustomerInfo: this.state.contactInfo,
        orderTime: moment().valueOf(),
        cancelOrderTime: moment()
          .add(10, "minutes")
          .valueOf(),
        status: "pending"
      };
    } else {
      data = {
        items: this.props.itemsInTheCart,
        CustomerInfo: this.state.contactInfo,
        orderTime: moment().valueOf(),
        cancelOrderTime: moment()
          .add(10, "minutes")
          .valueOf(),
        totalPrice: this.state.totalPrice,
        status: "pending"
      };
    }

    database
      .ref(`orders/${this.props.id}`)
      .push(data)
      .then(res => {
        this.setState({ loading: false, message: true });
        this.props.dispatch(getAllOrders(this.props.id));
        fetch(
          `https://admin-testing-burger-project.firebaseio.com/orders/${this.props.id}.json`,
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ ...data, id: res.key })
          }
        );
        this.props.dispatch({ type: "SET AFTER ORDER" });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };
  handleOptionChange = e => {
    this.setState({ selectedOption: e.target.value });
  };
  render() {
    if (!this.state.loading) {
      return (
        <div style={{ textAlign: "center" }}>
          {this.successMessage()}
          {!!this.state.customizedOrder ? (
            <div>
              <h1
                style={{
                  textAlign: "center",
                  paddingTop: "2rem",
                  color: "rgb(70, 12, 124)"
                }}
              >
                We hope it tastes well!!
              </h1>
              <BurgerIngredients
                layers={this.state.ingredients}
                totalPrice={this.state.totalPrice}
              />
            </div>
          ) : (
            <div className={classes.cartItems}>
              <div>
                {this.props.cartItems.map((itm, index) => (
                  <React.Fragment key={index}>
                    {index == 0 ? (
                      <React.Fragment>
                        <h2
                          style={{ textAlign: "center" }}
                          className={classes.header}
                        >
                          Items
                        </h2>
                        <h2
                          style={{ textAlign: "center" }}
                          className={classes.header}
                        >
                          Quantity
                        </h2>
                      </React.Fragment>
                    ) : null}
                    <h2>{itm.name}</h2>
                    <h2>{itm.quantity}</h2>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          <div className={classes.location} style={{ color: "#4831D4" }}>
            <h3>Select location?</h3>
            <div className={classes.locationOPtion}>
              <label style={{ color: "#4831D4", fontWeight: "500" }}>
                <input
                  type="radio"
                  name="react-tips"
                  value="restaurant"
                  checked={this.state.selectedOption === "restaurant"}
                  onChange={this.handleOptionChange}
                  style={{ marginRight: ".5rem" }}
                />
                Restaurant
              </label>
              <label style={{ color: "#4831D4", fontWeight: "500" }}>
                <input
                  type="radio"
                  name="react-tips"
                  value="home"
                  checked={this.state.selectedOption === "home"}
                  onChange={this.handleOptionChange}
                  style={{ marginRight: ".5rem" }}
                />
                Home/Others..
              </label>
            </div>
          </div>
          {!!this.state.selectedOption ? (
            <div>
              <ContactData
                contactInfo={this.contactHandler}
                buy={this.buy}
                error={err => this.setState({ error: err })}
                selectedOption={this.state.selectedOption}
              />
            </div>
          ) : null}

          {this.state.error && !this.state.message ? (
            <p
              style={{
                background: "red",
                display: "inline-block",
                color: "white",
                fontSize: "1rem",
                padding: "5px",
                borderRadius: "2px"
              }}
            >
              Please fill in all fields
            </p>
          ) : null}
        </div>
      );
    } else {
      return (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            marginBottom: "2rem"
          }}
        >
          <Loader />
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.totalPrice,
    id: state.authReducer.id,
    customizedOrder: state.adminReducer.customizedOrder,
    cartItems: state.adminReducer.addedToCartItmsInfo,
    itemsInTheCart: state.adminReducer.itemsInTheCart
  };
};

export default connect(mapStateToProps)(Checkout);
// fetch(`https://testing-bc79f.firebaseio.com/orders/${this.props.id}.json`,{
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, cors, *same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         // "Content-Type": "application/x-www-form-urlencoded",
//     },
//     redirect: "follow", // manual, *follow, error
//     referrer: "no-referrer", // no-referrer, *client
//     body: JSON.stringify(data),
// }).then(res=>{this.setState({loading:false,message:true})})
// .catch(err=>{this.setState({loading:false})})
