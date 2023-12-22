import React, { useState, ChangeEvent } from "react";
import "./Card.css";
import { BsFillPersonFill } from "react-icons/bs";

interface FormData {
  bill: number;
  noOfPeople: number;
}
export default function Card() {
  const [formData, setFormData] = useState<FormData>({
    bill: 0,
    noOfPeople: 0,
  });

  const [errors, setErrors] = useState<{ [key in keyof FormData]?: string }>(
    {}
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | number,
    field: keyof FormData
  ) => {
    const value =
      typeof event === "number" ? event.toString() : event.target.value;
    let numericValue = parseFloat(value) || 0;

    // Basic validation for bill
    if (field === "bill") {
      // Ensure bill is non-negative
      numericValue = Math.max(numericValue, 0);
    }

    // Basic validation for noOfPeople
    if (field === "noOfPeople") {
      // Ensure noOfPeople is a non-negative integer
      numericValue = Math.max(Math.floor(numericValue), 0);
    }

    setFormData((prevData) => ({
      ...prevData,
      [field]: numericValue,
    }));

    if (value.trim() !== "" || numericValue !== 0) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    } else {
      // Set error message if input is empty or 0
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Can't be 0",
      }));
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const currentValue = parseFloat(event.currentTarget.value);

    // Prevent the input of negative numbers using the up and down arrow keys
    if (
      (event.key === "ArrowUp" || event.key === "ArrowDown") &&
      currentValue <= 0
    ) {
      event.preventDefault();
    }
  };

  const calculateTotal = () => {
    const total =
      formData.noOfPeople !== 0 ? formData.bill / formData.noOfPeople : 0;

    // Use toFixed to format the total with 2 decimal places
    return total.toFixed(2);
  };
  return (
    <div className="card__container">
      <div className="card">
        <div className="grid-container">
          <div className="grid-item">
            <form className="form__container">
              <div className="form_item">
                <label className="label" htmlFor="noOfPeople">
                  Bill{" "}
                  {errors.bill && (
                    <span className="error-message">{errors.bill}</span>
                  )}
                </label>
                <div className="input-container">
                  <div className="icon-container">
                    <span role="img" aria-label="dollar icon">
                      ﹩
                    </span>
                  </div>
                  <input
                    id="Bill"
                    name="bill"
                    type="number"
                    accept="number"
                    placeholder="0"
                    className="input-field"
                    step="0.01"
                    onChange={(e) => handleInputChange(e, "bill")}
                    onKeyDown={(e) => handleKeyDown(e, "bill")}
                  />
                </div>
              </div>

              <div className="form_item">
                <label className="label" htmlFor="noOfPeople">
                  Number of People{" "}
                  {errors.noOfPeople && (
                    <span className="error-message">{errors.noOfPeople}</span>
                  )}
                </label>
                <div className="input-container">
                  <div className="icon-container mt-1">
                    <span
                      style={{ textAlign: "end" }}
                      role="img"
                      aria-label="dollar icon"
                    >
                      <BsFillPersonFill />
                    </span>
                  </div>
                  <input
                    id="noOfPeople"
                    name="noOfPeople"
                    type="number"
                    accept="number"
                    placeholder="0"
                    className="input-field"
                    onChange={(e) => handleInputChange(e, "noOfPeople")}
                    onKeyDown={(e) => handleKeyDown(e, "noOfPeople")}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="grid-item">
            <div>
              {" "}
              <p>Total: ${calculateTotal()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
