import * as React from "react";
import { render } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import {
  HashRouter as Router, // エイリアス　HashRouterという要素を<Router>という名前で扱う
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Editor } from "./pages/editor";
import { History } from "./pages/history";
import { useStateWithStorage } from "./hooks/use_state_with_storage";

const GlobalStyle = createGlobalStyle`
	body * {
		box-sizing: border-box;
	}
`;

// localStorageでデータの参照や保存に使うキー名　重複しないようにする　今回はファイルパス:値の名前
const StorageKey = "/editor:text";

const Main: React.FC = () => {
  const [text, setText] = useStateWithStorage("", StorageKey);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/editor">
            <Editor text={text} setText={setText} />
          </Route>
          <Route exact path="/history">
            <History setText={setText} />
          </Route>
          <Redirect to="/editor" path="*" />
        </Switch>
      </Router>
    </>
  );
};

render(<Main />, document.getElementById("app"));
