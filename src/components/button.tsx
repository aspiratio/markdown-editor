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
`;

// コンポーネントに渡すパラメーターの型
interface Props {
  children: string; // ボタン内のテキスト
  onClick: () => void; // ボタンをクリックした時の処理関数
}

// React.FC<Props>の意味は「引数のprops = Propsである」ということ
export const Button: React.FC<Props> = (props) => (
  <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
);
