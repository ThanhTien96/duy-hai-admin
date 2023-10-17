import { Col, InputNumber, Row, Slider } from "antd";
import { CURRENCY } from "constants";
import React, { useEffect, useState } from "react";

export type TSliderInputProps = {
  defaultVal?: number;
  onChange?: (value: number) => void;
};

const SliderInput = ({ defaultVal, onChange }: TSliderInputProps) => {
  const [inputValue, setInputValue] = useState(defaultVal);

  useEffect(() => {
    setInputValue(defaultVal);
  }, [defaultVal]);

  const onChangeValue = (newValue: number) => {
    setInputValue(newValue);
    onChange && onChange(newValue);
  };
  return (
    <Row>
      <Col span={14}>
        <Slider
          min={0}
          max={defaultVal}
          onChange={onChangeValue}
          value={typeof inputValue === "number" ? inputValue : 0}
        />
      </Col>
      <Col span={9}>
        <InputNumber
          className="w-full"
          addonAfter={CURRENCY.vnd}
          min={1}
          max={defaultVal}
          style={{ margin: "0 16px" }}
          value={inputValue}
          onChange={(value) => value && onChangeValue(value)}
        />
      </Col>
    </Row>
  );
};

export default SliderInput;
