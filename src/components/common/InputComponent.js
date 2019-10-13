import React, { Fragment, Component } from "react";
import  Slider  from "antd/lib/slider";


class InputCompenent extends Component {

	render() {
		const { onChange, marks, min, max, tooltipVisible, tooltipPlacement, id, label, value } = this.props;
		return (
			<Fragment>
				<h6>{label}</h6>
				<Slider
					min={min}
					max={max}
					marks={marks}
					value={value}
					tooltipVisible={tooltipVisible}
					tooltipPlacement={tooltipPlacement}
					onChange={(value) => onChange(id, value)}
				/>
			</Fragment>
		)
	}
}
export default InputCompenent;