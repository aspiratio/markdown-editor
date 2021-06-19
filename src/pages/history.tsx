import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { setTextRange } from "typescript";
import { Header } from "../components/header";
import { getMemoPageCount, getMemos, MemoRecord } from "../indexeddb/memos";

const { useState, useEffect } = React;

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const Wrapper = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
`;

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Paging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  text-align: center;
`;

const PagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;

  &:disabled {
    color: silver;
  }
`;

interface Props {
  setText: (text: string) => void;
}

export const History: React.FC<Props> = (props) => {
  const { setText } = props;
  // useState<扱う状態の型>(初期値) MemoRecordの型はmemos.tsで定義している また、配列で返すから[]がついている
  const [memos, setMemos] = useState<MemoRecord[]>([]); // テキスト履歴
  const [page, setPage] = useState(1); // 現在のページ
  const [maxPage, setMaxPage] = useState(1); // 最大のページ数
  const history = useHistory();

  useEffect(() => {
    // getMemos(page)はページ数をもとにデータを取得する最初の位置を指定する getMemos(1)は最初（0番目）から取得の意味
    getMemos(1).then(setMemos);
    getMemoPageCount().then(setMaxPage);
  }, []);

  // booleanは真偽値（trueかfalse）を返す 現在のページが最大ページ未満か、現在のページが2ページ以降か
  const canNextPage: boolean = page < maxPage;
  const canPrevPage: boolean = page > 1;
  const movePage = (targetPage: number) => {
    // 次ページまたは前のページに遷移できるかどうかを判定
    if (targetPage < 1 || maxPage < targetPage) {
      return;
    }
    setPage(targetPage); // 現在のページをtargetPageに更新
    getMemos(targetPage).then(setMemos); //getMemos(targetPage)でtargetPage個目の要素まで無視してそれ以降の要素をsetMemosで状態更新
  };

  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map((memo) => (
          <Memo
            key={memo.datetime}
            onClick={() => {
              setText(memo.text);
              history.push("/editor");
            }}
          >
            <MemoTitle>{memo.title}</MemoTitle>
            <MemoText>{memo.text}</MemoText>
          </Memo>
        ))}
      </Wrapper>
      <Paging>
        <PagingButton
          onClick={() => movePage(page - 1)}
          disabled={!canPrevPage}
        >
          ＜
        </PagingButton>
        {page} / {maxPage}
        <PagingButton
          onClick={() => movePage(page + 1)}
          disabled={!canNextPage}
        >
          ＞
        </PagingButton>
      </Paging>
    </>
  );
};
