import React, { useState, forwardRef, useImperativeHandle } from "react";
import { enum_BtnState } from "utils/common";
import { Button } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

// const indicator = useRef();
// indicator.current.setState(enum_BtnState.success)
// <StateIndicator ref={indicator} initstate={enum_BtnState.err} />

const StateIndicator = forwardRef((props, ref) => {
  const [btnstate, setBtnstate] = useState(props.initstate);

  useImperativeHandle(ref, () => ({
    setState(val) {
      console.log(val);
      setBtnstate(val);
    },
  }));

  return (
    <Button type="text">
      {btnstate === enum_BtnState.success && (
        <CheckCircleOutlined style={{ fontSize: "20px", color: "green" }} />
      )}
      {btnstate === enum_BtnState.dirty && (
        <ExclamationCircleOutlined
          style={{ fontSize: "20px", color: "#acad16" }}
        />
      )}
      {btnstate === enum_BtnState.err && (
        <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
      )}
    </Button>
  );
});

export default StateIndicator;
