import Dexie from "dexie";

// 保存するデータの型を定義（TypeScript用の定義）
export interface MemoRecord {
  datetime: string;
  title: string;
  text: string;
}

// Dexieのインスタンス生成 "markdown-editor"はデータベース名として設定
const database = new Dexie("markdown-editor");
// .version(1)はデータベースのバージョン .stores(使用するテーブル(なければ作られる): インデックスになるデータ名)
database.version(1).stores({ memos: "&datetime" });
// データを扱うテーブルクラスを取得 stringはキーとなるデータ(今回はdatetime)の型
const memos: Dexie.Table<MemoRecord, string> = database.table("memos");

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString();
  await memos.put({ datetime, title, text });
};

// 1ページあたり10件
const NUM_PER_PAGE: number = 10;

// count()はDexie に定義された関数 memosテーブルのデータ件数を取得
export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count();
  // memos.count()の処理が終わってtotalCountに値が代入されたら次の処理が始まる
  // Math.ceil()は引数の数値以上の最初の整数を返す　つまり、memosテーブルのデータ件数÷1ページあたりの件数の数値以上の最小の整数を返す
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE);
  return pageCount > 0 ? pageCount : 1;
};

// テキスト履歴をリストで取得する関数
// 戻り値が配列だからMemoRecordの末尾に[]をつける
// Promiseのthenは呼び出すときにつけるので、ここではつけない
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE;
  return memos
    .orderBy("datetime")
    .reverse()
    .offset(offset) // 最初のoffset個の要素は無視される
    .limit(NUM_PER_PAGE) // limit個までしか表示しない offsetと組み合わせればoffset+1個目〜offset+1+limit個目の要素が返される
    .toArray();
};
