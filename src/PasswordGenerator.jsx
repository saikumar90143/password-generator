import React, { useState } from "react";
import usePasswordGenerator from "./customHooks/useGenerator";
import styled from "styled-components";
function PasswordGenerator() {
  const [iscopied, setIscopied] = useState(true);
  const [range, setRange] = useState(5);

  // password includers

  const includers = [
    { title: "include upper case letters", state: false },
    { title: "include Lower case letters", state: false },
    { title: "include numbers", state: false },
    { title: "include special charcters", state: false },
  ];
  //   checkbox data
  const [checkboxData, setCheckboxData] = useState(includers);
  console.log("checkboxData: ", checkboxData);
  // generate password

  const { password, error, GeneratePassword } = usePasswordGenerator();

  // handleChange

  const handleChange = (i) => {
    const updatedCheckBoxData = [...checkboxData];
    updatedCheckBoxData[i].state = !updatedCheckBoxData[i].state;
    setCheckboxData(updatedCheckBoxData);
  };

  //   handle Copy password

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setTimeout(() => {
      setIscopied(true);
    }, 1000);
    setIscopied(false);
  };
  return (
    <Wrapper>
      {/* container */}
      <section className="container">
        <h3>Password Generator</h3>
        {/* password and copy button */}
        {password && (
          <div className="password">
            <span>{password}</span>
            <button onClick={handleCopy}>
              {!iscopied ? "copied" : "copy"}
            </button>
          </div>
        )}
        {/* password range */}
        <div className="password-range">
          <div>
            <input
              type="range"
              min={1}
              max={12}
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
          </div>
          <div className="char-length">
            <span>Character Length</span>
            <span>{range}</span>
          </div>
        </div>
        {/* password includers */}
        <div className="checkboxes">
          {checkboxData.map((item, i) => {
            return (
              <div key={i}>
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={() => handleChange(i)}
                />
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
        {/* password strength */}
        <div className="strength">
          <span>Password Strength</span>
          <span
            style={{
              color:
                range < 4
                  ? "red"
                  : range < 7 && range >= 4
                  ? "yellow"
                  : "greenyellow",
            }}
          >
            {range < 4
              ? "Poor"
              : range < 7 && range >= 4
              ? "Good"
              : range < 10 && range >= 7
              ? "strong"
              : "very strong"}
          </span>
        </div>
        <span style={{ color: "red" }}>{error}</span>
        {/* generate button */}
        <div className="generate-btn">
          <button onClick={() => GeneratePassword(checkboxData, range)}>
            Password Generator
          </button>
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .container {
    h3 {
      color: #0cde91;
      text-align: center;
      font-weight: 900;
    }
    background-color: #556aaa;
    width: 500px;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* password */
    .password {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    /* password range */
    .password-range {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      input {
        width: 100%;
      }
      .char-length {
        display: flex;
        justify-content: space-between;
      }
    }
    /* checkboxes */
    .checkboxes {
      display: grid;
      grid-template-columns: auto auto;
      gap: 1rem;
    }
    /* password strength */
    .strength {
      display: flex;
      justify-content: space-around;
    }
    /* password-generator */
    .generate-btn {
      display: flex;
      justify-content: center;
      button {
        width: 80%;
      }
    }
  }
`;
export default PasswordGenerator;
