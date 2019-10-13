import React, { Fragment, Component } from "react";
import Input from "./common/InputComponent";
import apiRequest  from "../webUtils";
import Progress from "antd/lib/progress";
import "../styles/main.scss";
import  _ from "underscore";

class EmiForm extends Component {

    state = {
        input: {
            amount: 500,
            numMonths: 6
        },
        amount: {
            500: '500$',
            5000: '5000$'
        },
        months: {
            6: '6 m',
            24: '24m'
        },
        output: null
    }

    sliderHandler = async (id, value) => {
        this.setState({ input: { ...this.state.input, [id]: value}})
        let data = { ...this.state.input, [id]: value}
        let response = await apiRequest.getData("interest", data);
        if(response.data) {
            this.setState({
                output: {...response.data}
            });
            this.props.updateEmiData(response.data)
        }
    } 

    componentDidUpdate(prevProps) {
        let prevSelectedEmiData = prevProps.selectedEmiData;
        let curnSelectedEmiData = this.props.selectedEmiData
        if(curnSelectedEmiData && !_.isEqual(prevSelectedEmiData,curnSelectedEmiData)) {
            this.setState({
                input: {
                    amount: curnSelectedEmiData.principal.amount,
                    numMonths: curnSelectedEmiData.numPayments
                },
                output: {...curnSelectedEmiData}
            })
        }
    }

    render() {
        let { output, amount, months } = this.state;
        let numMonths = this.state.input.numMonths;
        let loanAmount = this.state.input.amount;
        let interest = output ? (
            <Fragment> 
                <h3 className="emi-form-title">Your EMI Plan <span className="text-center">{output.monthlyPayment.amount} X {output.numPayments}</span></h3>
                <Progress type="circle" sm={3} md={2} width={300} 
                    percent={Number((((output.monthlyPayment.amount * output.numPayments)-(output.principal.amount))/100).toFixed(1))} 
                    format={ percent => 
                    <div style={{marginRight: "12px", marginTop: "15px"}}>
                        <p>EMI:<span className="value">  {`${output.monthlyPayment.amount} ${output.monthlyPayment.currency}`}</span></p>
                        <p>Interest Rate:<span className="value">  {output.interestRate}</span></p> 
                        <p>Duration:<span className="value">  {output.numPayments} months</span></p>  
                        <p className="text-center" style={{textTransform:"uppercase"}}>Total Interest</p>
                        <p><span className="total-interest">{(output.monthlyPayment.amount * output.numPayments)-(output.principal.amount)} {output.monthlyPayment.currency}</span></p>
                    </div> } 
                />
            </Fragment>
        ) : null
        return (
            <Fragment>
                <div className="hero" >
                   <div className="emi-form">
                   <div className="panel panel-one">
                    <h3 className="emi-form-title">EMI Calculator</h3>
                        <div style={{ margin: "60px" }}>
                            <Input
                                onChange={this.sliderHandler}
                                marks={amount}
                                min={500}
                                max={5000}
                                value={loanAmount}
                                id={"amount"}
                                label={"Loan Amount"}
                                tooltipVisible={true}
                                tooltipPlacement="bottom"
                            />
                        </div>
                        <div style={{ margin: "60px" }}>
                            <Input
                                onChange={this.sliderHandler}
                                marks={months}
                                min={6}
                                max={24}
                                value={numMonths}
                                id={"numMonths"}
                                label={"Loan Duration"}
                                tooltipVisible={true}
                                tooltipPlacement="bottom"
                            />
                        </div>    
                    </div>
                    <div className="panel panel-two">
                    {
                     interest
                    }
                    </div>
                   </div>
                </div>
            </Fragment>
        )
    }
}
export default EmiForm;