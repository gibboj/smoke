import React from "react";
import styled from "styled-components"


const StyledTextInput = styled.input`
    display:block;
    padding: 4px 5px;
    margin: 6px 0 0;
    border: 1px solid #999;
    box-shadow: 1px 1px 1px rgb(30 30 30 / 30%);
`;


const StyledLabel = styled.label`
  color: #333;
  margin-right: 10px;
  display:block
  
`;

const StyledDiv = styled.div`
  text-align: left;
  margin: 10px 0px;
`;

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}


export const TextInput: React.FC<TextInputProps> = ({
    label,
    ...props
}) => (
    <StyledDiv>
        <StyledLabel>{label}</StyledLabel>
        <StyledTextInput className={"full-width"} type="number" {...props} />
    </StyledDiv>
);