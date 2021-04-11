import React from "react";
import styled from "styled-components"


const StyledButton = styled.button`
  color: grey;
  display: block;
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
    children: React.ReactNode
}


export const Button: React.FC<ButtonProps> = ({
    children,
    icon,
    ...props
}) => (
    <StyledButton {...props}>
        {icon && <i className="material-icons">{icon}</i>}
        {children}
    </StyledButton>
);