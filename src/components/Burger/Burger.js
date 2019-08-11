import React, { Component } from "react";
import classes from "./Burger.module.scss";
import stockout from "./stockout.jpg";

class burger extends Component {
  link = () => {
    const { url, name, calories, id, price, description, status } = this.props;
    const data = { url, name, calories, id, price, description };
    if (status !== "stockOut") {
      this.props.history.push({
        pathname: `/burger/${this.props.id}`,
        state: { ...data }
      });
    }
  };
  render() {
    const { url, name, calories, id, price, status } = this.props;
    let allClass = [];
    {
      status !== "stockOut"
        ? allClass.push(classes.burgerImage)
        : allClass.push(classes.notHover);
    }
    return (
      <div
        className={classes.burger}
        onClick={this.link}
        style={{ cursor: "pointer" }}
      >
        <img src={url} className={allClass.join("")} />
        {status === "new" ? <h3 className={classes.new}>New</h3> : null}
        {status === "stockOut" ? (
          <img src={stockout} className={classes.stockOut} />
        ) : null}
        <h2 className={classes.burgerName}>{name}</h2>
        <h2 className={classes.calorie}>
          {calories} <strong>Cal</strong>
        </h2>
        <h3 className={classes.price}>price : {price} tk</h3>
      </div>
    );
  }
}

export default burger;
