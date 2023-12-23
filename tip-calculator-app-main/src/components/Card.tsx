import "./Card.css";
import { BsFillPersonFill, BsCurrencyDollar } from "react-icons/bs";

import { Button, Form, InputNumber } from "antd";
import React, { useState } from "react";

interface FormData {
  bill?: number;
  tip?: string | number;
  noOfPeople?: number;
  customTip?: number;
}

interface TipResults {
  tipAmountPerPerson: string;
  totalAmountPerPerson: string;
}

export default function Card() {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<FormData>({});
  const [tipResults, setTipResults] = useState<TipResults>({
    tipAmountPerPerson: "0.00",
    totalAmountPerPerson: "0.00",
  });

  const tipArray = [5, 10, 15, 25, 50];

  const calculateTip = (
    bill: number,
    tipPercentage: number | string,
    noOfPeople: number
  ): TipResults => {
    const tipAmount = (bill * Number(tipPercentage)) / 100;
    const totalAmount = bill + tipAmount;
    const tipAmountPerPerson = tipAmount / noOfPeople;
    const totalAmountPerPerson = totalAmount / noOfPeople;

    return {
      tipAmountPerPerson: tipAmountPerPerson.toFixed(2),
      totalAmountPerPerson: totalAmountPerPerson.toFixed(2),
    };
  };

  const onFinish = (values: FormData) => {
    setFormData(values);

    const { bill, tip, noOfPeople } = values;
    const tipPercentage = tip === "Custom" ? (values.customTip as number) : tip;

    const tipResults = calculateTip(
      bill as number,
      tipPercentage as number,
      noOfPeople as number
    );

    setTipResults(tipResults);
  };

  console.log(formData);

  const handleReset = () => {
    form.resetFields(); // Reset form fields
    setFormData({}); // Clear form data
    setTipResults({
      tipAmountPerPerson: "0.00",
      totalAmountPerPerson: "0.00",
    }); // Reset tip results
  };

  return (
    <div className="card__container">
      <div className="card">
        <div className="grid-container">
          <div className="grid-item">
            <Form
              initialValues={{ noOfPeople: 1 }}
              onFinish={onFinish}
              layout="vertical"
              form={form}
              className="form__container"
            >
              <div className="form_item">
                <Form.Item label="Bill">
                  <Form.Item
                    name="bill"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Can't be zero",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      controls={false}
                      className="w-100"
                      prefix={
                        <BsCurrencyDollar
                          color={"hsl(186, 14%, 43%)"}
                          size={22}
                        />
                      }
                      size="large"
                      placeholder="0"
                    />
                  </Form.Item>
                </Form.Item>
              </div>

              <div className="form_item">
                <Form.Item label="Select Tip %">
                  <Form.Item
                    name="tip"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Can't be zero",
                      },
                    ]}
                  >
                    <div className="container">
                      {tipArray.map((tip, i) => (
                        <div className="column" key={i}>
                          <p>{tip}</p>
                        </div>
                      ))}

                      <InputNumber
                        min={0}
                        className="custom_input"
                        size="large"
                        controls={false}
                        placeholder="Custom"
                      />
                    </div>
                  </Form.Item>
                </Form.Item>
              </div>

              <div className="form_item">
                <Form.Item label="No of People">
                  <Form.Item
                    name="noOfPeople"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Can't be zero",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      controls={false}
                      className="w-100"
                      placeholder="0"
                      size="large"
                      prefix={
                        <BsFillPersonFill
                          color={"hsl(186, 14%, 43%)"}
                          size={22}
                        />
                      }
                    />
                  </Form.Item>
                </Form.Item>
              </div>
              <div>
                <Button htmlType="submit">Submit</Button>
              </div>
            </Form>
          </div>
          <div className="grid-item">
            <div className="right-container">
              <div className="right-column">
                <p>Tip Amount</p>
                <p>/ person</p>
              </div>
              <div className="right-column">
                <h2 style={{ textAlign: "right" }}>
                  {" "}
                  ${tipResults.tipAmountPerPerson}
                </h2>
              </div>
            </div>
            <div className="right-container">
              <div className="right-column">
                <p>Total</p>
                <p>/ person</p>
              </div>
              <div className="right-column">
                <h2 style={{ textAlign: "right" }}>
                  {" "}
                  ${tipResults.totalAmountPerPerson}
                </h2>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  margin: "0 2rem",
                  textTransform: "uppercase",
                  padding: "20px",
                }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
