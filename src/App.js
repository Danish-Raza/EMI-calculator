import React, { Component } from 'react';
import "./styles/main.css";
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.css';
import "@fortawesome/fontawesome-free/css/all.css";
import EmiForm from "./components/EmiForm";
import SideBar from "./components/SideBar";

class App extends Component {
  state = {
    emiData: [],
    selectedEmiData: null
  }

  componentDidMount() {
    let storedEmiData = localStorage.getItem("emiData");
    if (storedEmiData) {
      this.setState({ emiData: [...JSON.parse(storedEmiData)] })
    }
  }

  updateEmiData = (data) => {
    let currentEmiData = [...this.state.emiData];
    if (!currentEmiData.find(record => record.numPayments === data.numPayments && record.principal.amount === data.principal.amount)) {
      currentEmiData.push({ ...data });
      this.setState({ emiData: currentEmiData });
      localStorage.setItem("emiData", JSON.stringify(currentEmiData))
    }
  }

  selectEmiHandler = (data) => {
    this.setState({selectedEmiData: {...data}});
  }

  clearLocalStorage = () => {
    localStorage.removeItem("emiData");
    this.setState({emiData: [], selectedEmiData: null})
  }

  render() {
    const { emiData, selectedEmiData } = this.state;
    return (
      <div className="App d-flex justify-content-start">
        <div>
          <div className="d-flex justify-content-between">
            <h2 className="sideBar-heading" >History</h2>
            <div className="delete">
              {
                (this.state.emiData.length > 0) && <i className="fa fa-trash" aria-hidden="true" onClick={this.clearLocalStorage}></i>
              }
            </div>
          </div>
          <div className="sidebar">
            <SideBar emiData={emiData} selectEmiHandler={this.selectEmiHandler}  />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <EmiForm updateEmiData={this.updateEmiData} selectedEmiData={selectedEmiData} />
        </div>
      </div>
    );
  }
}

export default App;
