import React, { useState } from "react";
import styled from "styled-components";

import $ from "../../styles/global";
import Button from "../Button";

const SmallInput = styled.input`
  font-size: ${$.fontSize().standard};
  background-color: ${$.colors.brown[200]};
  border: none;
  border-radius: ${$.borderRadius.large};
  box-shadow: ${$.boxShadow.standard};
  width: calc(100% - 40px); // Minus padding
  padding: 15px 20px;
  color: ${$.colors.brown[600]};
  margin-bottom: 30px;
`;

const LargeInput = styled.textarea`
  font-size: ${$.fontSize().standard};
  background-color: ${$.colors.brown[200]};
  border: none;
  border-radius: ${$.borderRadius.large};
  box-shadow: ${$.boxShadow.standard};
  width: calc(100% - 40px); // Minus padding
  padding: 20px 20px;
  height: 150px;
  color: ${$.colors.brown[600]};
  margin-bottom: 30px;
`;

const SubmitButton = styled(Button)`
  width: calc(100%);
  height: 60px;
`;

const ContactForm = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = () => {
    console.log(inputs);
    setInputs({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <SmallInput
        type="text"
        placeholder="Name"
        value={inputs.name}
        onChange={(e) => {
          setInputs({
            ...inputs,
            name: e.target.value,
          });
        }}
      />
      <SmallInput
        type="text"
        placeholder="Email"
        value={inputs.email}
        onChange={(e) => {
          setInputs({
            ...inputs,
            email: e.target.value,
          });
        }}
      />
      <LargeInput
        type="text"
        placeholder="Message"
        value={inputs.message}
        onChange={(e) => {
          setInputs({
            ...inputs,
            message: e.target.value,
          });
        }}
      />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </>
  );
};

export default ContactForm;
