import React, { Component } from "react";
import { connect } from "react-redux";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import { withRouter } from "react-router";
import { Scrollbars } from "react-custom-scrollbars";
import classes from "./Layout.module.scss";
import Header from "../../components/Header/Header";
import FilterModal from "../../components/FilterModal/FilterModal";
import CustomizedSection from "../CustomizedSection/CustomizedSection";
import BurgerTypes from "../BurgerTypes/BurgerTypes";
import HamburgerModal from "../HamburgerModal/HamburgerModal";
import Footer from "../Footer/Footer";

class Layout extends Component {
  state = {
    toggle: false,
    hamburgerToggle: false
  };
  hamburgerToggle = () => {
    const prev = this.state.hamburgerToggle;
    this.setState({ hamburgerToggle: !prev });
  };
  toggle = () => {
    const prev = this.state.toggle;
    this.setState({ toggle: !prev });
    if (this.state.hamburgerToggle) {
      const ham = this.state.hamburgerToggle;
      this.setState({ hamburgerToggle: !ham });
    }
  };
  render() {
    return (
      <Scrollbars
        style={{ width: "100vw", height: "100vh" }}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: "gray",
              width: "7",
              opacity: "0.8",
              cursor: "pointer",
              margin: "0"
            }}
          />
        )}
      >
        <div>
          <HamburgerModal
            on={this.state.hamburgerToggle}
            toggle={this.hamburgerToggle}
          />
          <HamburgerIcon
            hamburgerToggle={this.hamburgerToggle}
            on={this.state.hamburgerToggle}
          />

          <Header on={this.toggle} />
          <FilterModal on={this.state.toggle} />
          {this.props.location.pathname === "/" && (
            <React.Fragment>
              <CustomizedSection />
              <BurgerTypes />
            </React.Fragment>
          )}

          <main>
            {this.props.children}
            {this.props.location.pathname === "/" &&
              (Object.keys(this.props.priceList).length > 0 ? (
                <Footer />
              ) : null)}
          </main>
        </div>
      </Scrollbars>
    );
  }
}

let mapStateToProps = state => {
  return {
    check_signup_link: state.authReducer.check_signup_link,
    priceList: state.adminReducer.price
  };
};

export default connect(mapStateToProps)(withRouter(Layout));
