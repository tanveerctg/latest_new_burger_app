import React, { Component } from "react";
import classes from "./ContactData.module.scss";
import Aux from "../../HOC/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bkash from "./bkash.png";
class ContactData extends Component {
  state = {
    data: {
      name: null,
      email: null,
      mobile: null,
      address: null,
      tableNo: null,
      selectedOption: null
    }
  };

  nameChangeHandler = e => {
    const regEx = /^[a-z\s?\-?]+$/gi;
    if (e.target.value !== null) {
      if (regEx.test(e.target.value)) {
        let getValue = e.target.value;
        let upgradeName = { ...this.state.data };
        upgradeName["name"] = getValue;
        this.setState({ data: upgradeName });
        e.target.className = classes.valid;
      } else {
        let upgradeName = { ...this.state.data };
        upgradeName["name"] = null;
        this.setState({ data: upgradeName });
        e.target.className = classes.invalid;
      }
    }
    e.preventDefault();
  };
  emailChangeHandler = e => {
    const regEx = /^([\w\.?\-?]+)@([[a-z]+)(\.[a-z]{2,8})(\.[a-z]{2,8})?$/gi;
    if (e.target.value !== null) {
      if (regEx.test(e.target.value)) {
        let getValue = e.target.value;
        let upgradeEmail = { ...this.state.data };
        upgradeEmail["email"] = getValue;
        this.setState({ data: upgradeEmail });
        e.target.className = classes.valid;
      } else {
        let upgradeEmail = { ...this.state.data };
        upgradeEmail["email"] = null;
        console.log(upgradeEmail);
        this.setState({ data: upgradeEmail });
        e.target.className = classes.invalid;
      }
    }

    e.preventDefault();
  };
  mobileChangeHandler = e => {
    const regEx = /^(\d){11}$/gi;
    if (e.target.value !== null) {
      if (regEx.test(e.target.value)) {
        let getValue = e.target.value;
        let upgradeMobile = { ...this.state.data };
        upgradeMobile["mobile"] = getValue;
        this.setState({ data: upgradeMobile });
        e.target.className = classes.valid;
      } else {
        let upgradeName = { ...this.state.data };
        upgradeName["mobile"] = null;
        this.setState({ data: upgradeName });
        e.target.className = classes.invalid;
      }
    }
    e.preventDefault();
  };
  addressChangeHandler = e => {
    const regEx = /.+/gi;
    if (e.target.value !== null) {
      if (regEx.test(e.target.value)) {
        let getValue = e.target.value;
        let upgradeAddress = { ...this.state.data };
        upgradeAddress["address"] = getValue;
        this.setState({ data: upgradeAddress });
        e.target.className = classes.valid;
      } else {
        let upgradeName = { ...this.state.data };
        upgradeName["address"] = null;
        this.setState({ data: upgradeName });
        e.target.className = classes.invalid;
        e.target.className = classes.invalid;
      }
    }

    e.preventDefault();
  };
  handleSubmit = e => {
    if (this.props.selectedOption === "home") {
      let name = this.state.data.name;
      let email = this.state.data.email;
      let mobile = this.state.data.mobile;
      let address = this.state.data.address;
      let payment = this.state.data.selectedOption;

      let data = { name, email, mobile, address, payment };

      if (name && email && mobile && address && payment) {
        console.log("ok");
        this.props.contactInfo(data);
        setTimeout(() => {
          this.props.buy();
        }, 100);
      } else {
        this.props.error(true);
      }
    } else {
      let name = this.state.data.name;
      let table = this.state.data.tableNo;
      let payment = this.state.data.selectedOption;
      let data = { name, table, payment };
      console.log(name, table, payment);
      if (name && table && payment) {
        console.log("ok");
        this.props.contactInfo(data);
        setTimeout(() => {
          this.props.buy();
        }, 100);
      } else {
        console.log("not ok");
        this.props.error(true);
      }
    }

    e.preventDefault();
  };
  handleChange = e => {
    const regEx = /\d+/gi;

    if (e.target.value !== null) {
      if (regEx.test(e.target.value)) {
        let getValue = e.target.value;
        let upgradeTableNo = { ...this.state.data };
        upgradeTableNo["tableNo"] = getValue;
        this.setState({ data: upgradeTableNo });
        e.target.className = classes.valid;
      } else {
        let getValue = e.target.value;
        let upgradeTableNo = { ...this.state.data };
        upgradeTableNo["tableNo"] = getValue;
        this.setState({ data: upgradeTableNo });
        e.target.className = classes.invalid;
      }
    }
    e.preventDefault();
  };
  handleOptionChange = e => {
    let upgradeTable = { ...this.state.data };
    if (!!upgradeTable["selectedOption"]) {
      upgradeTable["selectedOption"] = false;
      this.setState({ data: upgradeTable });
    } else {
      upgradeTable["selectedOption"] = true;
      this.setState({ data: upgradeTable });
    }

    // this.setState({ selectedOption: e.target.value });
  };
  render() {
    console.log(!!this.state.data.selectedOption);
    return (
      <form onSubmit={this.handleSubmit} className={classes.form}>
        {this.props.selectedOption === "home" ? (
          <Aux>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                placeholder="Name"
                type="text"
                onChange={this.nameChangeHandler}
              />
              <label>Name</label>
              <FontAwesomeIcon
                icon={["fas", "check-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="#6DB65B"
              />
              <FontAwesomeIcon
                icon={["fas", "times-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="red"
              />
            </div>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                placeholder="Email"
                type="text"
                onChange={this.emailChangeHandler}
              />
              <label>Email</label>
              <FontAwesomeIcon
                icon={["fas", "check-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="#6DB65B"
              />
              <FontAwesomeIcon
                icon={["fas", "times-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="red"
              />
            </div>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                placeholder="Mobile"
                type="text"
                onChange={this.mobileChangeHandler}
              />
              <label>Mobile</label>
              <FontAwesomeIcon
                icon={["fas", "check-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="#6DB65B"
              />
              <FontAwesomeIcon
                icon={["fas", "times-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="red"
              />
            </div>

            <div style={{ position: "relative", width: "100%" }}>
              <textarea
                placeholder="Address"
                type="text"
                onChange={this.addressChangeHandler}
              />
              <label>Address</label>
              <FontAwesomeIcon
                icon={["fas", "check-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="#6DB65B"
              />
              <FontAwesomeIcon
                icon={["fas", "times-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="red"
              />
            </div>
          </Aux>
        ) : (
          <React.Fragment>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                placeholder="Name"
                type="text"
                onChange={this.nameChangeHandler}
              />
              <label>Name</label>
              <FontAwesomeIcon
                icon={["fas", "check-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="#6DB65B"
              />
              <FontAwesomeIcon
                icon={["fas", "times-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 0"
                }}
                size="2x"
                color="red"
              />
            </div>
            <div style={{ position: "relative", width: "100%" }}>
              <select onChange={this.handleChange}>
                {!this.state.data.tableNo ? (
                  <option default value="">
                    Select Table
                  </option>
                ) : null}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              {!this.state.data.tableNo ? null : (
                <label style={{ opacity: "1", transform: "translateY(-450%)" }}>
                  Table No
                </label>
              )}
              <FontAwesomeIcon
                icon={["fas", "check-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 1%"
                }}
                size="2x"
                color="#6DB65B"
              />
              <FontAwesomeIcon
                icon={["fas", "times-circle"]}
                style={{
                  display: "inlineBlock",
                  position: "absolute",
                  right: "0",
                  margin: "3% 0 0 1%"
                }}
                size="2x"
                color="red"
              />
            </div>
          </React.Fragment>
        )}
        <div style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              display: "inline-block",
              width: "81%",
              display: "flex",
              justifyContent: "start",
              position: "relative"
            }}
          >
            <label
              style={{
                color: "#333333",
                fontWeight: "600",
                display: "inline-block"
              }}
            >
              <input
                type="checkbox"
                name="react-tips"
                onChange={this.handleOptionChange}
                style={{
                  marginRight: ".5rem",
                  display: "inline-block",
                  width: "inherit"
                }}
              />
              Cash On Delivery
            </label>
          </div>
        </div>

        <div style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              display: "inline-block",
              width: "81%",
              display: "flex",
              justifyContent: "start",
              position: "relative"
            }}
          >
            <label
              style={{
                color: "#333333",
                fontWeight: "600",
                display: "inline-block"
              }}
            >
              ( &nbsp;
              <img
                src={bkash}
                style={{ width: "60px", display: "inlineBlock" }}
              ></img>{" "}
              <span>will be implemented later</span>
              &nbsp; )
            </label>
          </div>
        </div>

        <div>
          <input type="submit" value="Order" />
        </div>
      </form>
    );
  }
}

export default ContactData;
