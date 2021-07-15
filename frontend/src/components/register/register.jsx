import React, { Component } from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../Store/Actions/index";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    };
  }

  signup(evt) {
    evt.preventDefault();
    let data = {
      name: this.state.username,
      emailID: this.state.email,
      password: this.state.password,
    };

    this.props.Register(data).then(() => {
      this.props.history.push({
        pathname: "/login",
      });
    });
  }

  render() {
    return (
      <div className="row login-page">
        <div className="col-md-4 offset-md-4 text-center border-card md200">
          <div className="row">
            <div className="col-md-12">
              <h1 className="login-heading-text">Sign Up</h1>
              <p className="sub-text">
                Hello there! Sign up and start managing your <br></br>
                account.
              </p>
            </div>

            <div className="col-md-10 offset-md-1 md10">
              <form
                className="row"
                style={{ display: this.state.emailIDType }}
                onSubmit={(evt) => this.signup(evt)}
              >
                <div className="col-md-12 text-left">
                  <label>Enter Your Name</label>
                </div>
                <div className="col-md-12">
                  <Input
                    size="large"
                    type="text"
                    required
                    value={this.state.username}
                    onChange={(evt) =>
                      this.setState({ username: evt.target.value })
                    }
                  />
                </div>
                <div className="col-md-12 text-left md20">
                  <label>Enter Your Email Address</label>
                </div>
                <div className="col-md-12">
                  <Input
                    size="large"
                    type="email"
                    required
                    value={this.state.email}
                    onChange={(evt) =>
                      this.setState({ email: evt.target.value })
                    }
                  />
                </div>
                <div className="col-md-12 text-left md20">
                  <label>Enter password</label>
                </div>
                <div className="col-md-12 ">
                  <Input.Password
                    size="large"
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
                </div>

                <div className="col-md-12 text-left md20">
                  <button
                    type="submit"
                    style={{ height: "40px" }}
                    className="btn-primary btn "
                    onSubmit={() => this.signup()}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col-md-12 text-left md50">
                  <p className="sub-text">
                    Already have a account? <a href="/login">Sign In</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  Register: (v) => dispatch(actions.Register(v)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
