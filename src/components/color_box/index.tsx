import React, { Component } from "react";
interface PropsType {
  color: string;
}
export default class ColorBox extends Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
   
    return <div style={{ backgroundColor: this.props.color}} className="color-box d-flex d-inline-block"></div>
  }
}

