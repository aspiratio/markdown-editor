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
