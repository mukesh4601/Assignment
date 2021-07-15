import React, { PureComponent } from "react";
import { Input, message } from "antd";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import actions from "../../Store/Actions/index";
import { withRouter } from "react-router";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./login.css";
import axios from "axios";
class SignIN extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
    };
  }

  login(evt) {
    evt.preventDefault();
    if (this.state.username === "") {
      message.error("Enter Username");
      return;
    }

    this.props
      .Loginuser({
        emailID: this.state.username,
        password: this.state.password,
      })
      .then(() => {
        this.props.history.push({
          pathname: "/dashboard",
          state: {
            name: this.props._login.name,
          },
        });
      });
  }

  render() {
    return (
      <div className="row login-page">
        <div className="col-md-4 offset-md-4 text-center border-card md200">
          <div className="row">
            <div className="col-md-12">
              <h1 className="login-heading-text">Sign In</h1>
              <p className="sub-text">Pixel Vision </p>
            </div>

            <div className="col-md-10 offset-md-1 md10">
              <form
                className="row"
                style={{ display: this.state.emailIDType }}
                onSubmit={(evt) => this.login(evt)}
              >
                <div className="col-md-12">
                  <Input
                    size="large"
                    type="email"
                    autoComplete="off"
                    className="logininput"
                    required
                    placeholder="Email address"
                    onChange={(evt) =>
                      this.setState({ username: evt.target.value })
                    }
                  />
                </div>
                <div className="col-md-12 md20">
                  <Input.Password
                    size="large"
                    autoComplete="off"
                    required
                    value={this.state.password}
                    onChange={(evt) =>
                      this.setState({ password: evt.target.value })
                    }
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    placeholder="Password"
                    type="password"
                  />
                  <p className="text-right blue-text cursor">
                    <a href="/">
                      <small>Forgot Password?</small>
                    </a>
                  </p>
                </div>

                <div className="col-md-12 md20">
                  <Button
                    type="submit"
                    className="btn-primary btn-block paddingbtn"
                    onSubmit={() => this.login()}
                  >
                    Sign In
                  </Button>
                </div>
                <div className="col-md-12 text-left md50">
                  <p className="sub-text">
                    New user? <a href="/register">Sign Up</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4 offset-md-4 text-center bottom">
          <p className="sub-text">© Pixel Vision All rights reserved 2020</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  _login: state.loginregister.login_data,
});
const mapDispatchToProps = (dispatch) => ({
  Loginuser: (v) => dispatch(actions.Loginuser(v)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIN));
