import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

  &.cancel {
    background: white;
    border: 1px solid gray;
    color: gray;
  }
`;

// コンポーネントに渡すパラメーターの型
interface Props {
  cancel?: boolean; // cancelというパラメータを指定してもしなくてもよいという意味
  children: string; // ボタン内のテキスト
  onClick: () => void; // ボタンをクリックした時の処理関数
}

// React.FC<Props>の意味は「引数のprops = Propsである」ということ
export const Button: React.FC<Props> = (props) => (
  <StyledButton
    onClick={props.onClick}
    className={props.cancel ? "cancel" : ""}
  >
    {props.children}
  </StyledButton>
);
