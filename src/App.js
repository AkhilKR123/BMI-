import './App.css';
import { useState } from 'react';

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [isWeightValid, setIsWeightValid] = useState(true);
  const [isHeightValid, setIsHeightValid] = useState(true);
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");

  const validate = (e) => {
    const { name, value } = e.target;

    if (!!value.match('^[0-9.]*$')) {
      if (name === 'weight') {
        setWeight(value);
        setIsWeightValid(true);
      } else if (name === 'height') {
        setHeight(value);
        setIsHeightValid(true);
      }
    } else {
      if (name === 'weight') {
        setWeight(value);
        setIsWeightValid(false);
      } else if (name === 'height') {
        setHeight(value);
        setIsHeightValid(false);
      }
    }
  };

  const calculateBmi = () => {
    const heightInMeters = parseFloat(height);
    const weightInKg = parseFloat(weight);
    const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(calculatedBmi);
    categorizeBmi(calculatedBmi);
  };

  const categorizeBmi = (bmiValue) => {
    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue >= 18.5 && bmiValue < 24.9) setCategory("Normal weight");
    else if (bmiValue >= 25 && bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obesity");
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setIsWeightValid(true);
    setIsHeightValid(true);
    setBmi(0);
    setCategory("");
  };

  return (
    <>
      <div className="main-container">
        <div className="card shadow-lg">
          <h1 className="text-center">BMI Calculator</h1>
          <p className="text-center">Calculate your Body Mass Index easily</p>
          <div className="result-card">
            <h1 className="bmi-value">{bmi > 0 ? bmi : "--"}</h1>
            <p className="bmi-category">{category || "Enter your details to calculate BMI"}</p>
          </div>

          <div className="input-group">
            <label htmlFor="weight">Weight (Kg):</label>
            <input
              type="text"
              id="weight"
              className={`form-control ${!isWeightValid ? "invalid" : ""}`}
              value={weight}
              name="weight"
              placeholder="Enter your weight"
              onChange={(e) => validate(e)}
            />
            {!isWeightValid && <p className="error-text">*Invalid Input</p>}
          </div>

          <div className="input-group">
            <label htmlFor="height">Height (M):</label>
            <input
              type="text"
              id="height"
              className={`form-control ${!isHeightValid ? "invalid" : ""}`}
              value={height}
              name="height"
              placeholder="Enter your height"
              onChange={(e) => validate(e)}
            />
            {!isHeightValid && <p className="error-text">*Invalid Input</p>}
          </div>

          <div className="button-group">
            <button
              disabled={!isWeightValid || !isHeightValid || !weight || !height}
              className="btn btn-success"
              onClick={calculateBmi}
            >
              Calculate
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
