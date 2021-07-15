import React, { PureComponent } from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../Store/Actions/index";
import Cookies from "js-cookie";

class calender extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      day: "",
      name: "",
    };
  }

  componentDidMount() {
    let data = this.props.history.location.state;
    if (data === undefined) {
    } else {
      this.setState({
        name: data.name,
      });
    }
  }

  getDetails(evt) {
    evt.preventDefault();

    // let date = moment(this.state.date).format("dddd");     /// can do from client side also no need of API
    // this.setState({
    //   day: date,
    // });
    this.props
      .CalenderData({
        date: this.state.date,
      })
      .then(() => {
        this.setState({
          day: this.props._data.day,
        });
      });
  }

  logout() {
    Cookies.remove("token");
    window.location.href = "/login";
  }

  render() {
    return (
      <div className="row login-page">
        <div className="col-md-4 offset-md-4 text-center border-card md200">
          <form className="row" onSubmit={(evt) => this.getDetails(evt)}>
            <div className="col-md-12 text-left">
              <h5 className="sub-text">
                Welcome {this.state.name}{" "}
                <small
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={() => this.logout()}
                >
                  (Logout)
                </small>{" "}
              </h5>
            </div>

            <div className="col-md-8 text-left md20">
              <label>Choose Date</label> <br></br>
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                class="form-control "
                name="eventDate"
                id=""
                required
                autofocus
                autocomplete="nope"
                onChange={(evt) => this.setState({ date: evt.target.value })}
              />
            </div>
            <div className="col-md-4 md20">
              <label></label>
              <button className="btn btn-default md10" type="submit">
                submit
              </button>
            </div>
            {this.state.day === "" ? (
              <></>
            ) : (
              <div className="col-md-12 text-left md50">
                <h6 className="heading-text">
                  Day on {this.state.date} is {this.state.day}
                </h6>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  _data: state.calender.data,
});
const mapDispatchToProps = (dispatch) => ({
  CalenderData: (v) => dispatch(actions.CalenderData(v)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(calender)
);
