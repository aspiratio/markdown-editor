// Web Worker（複数処理を同時に行うための仕組み）
// 以下は流れ
// 1.メインスレッドから Web Worker を読み込む
// 2.メインスレッド内で Web Worker の結果を受け取るコールバック関数を onmessage にセットする
// 3.メインスレッドから Web Worker に postMessage でデータを送信する
// 4.Web Worker は onmessage の関数でデータを受け取って処理を行う
// 5.Web Worker は postMessage でメインスレッドに処理結果を返却する
// 6.メインスレッドは onmessage に登録した関数から処理結果を受け取る
// 7.3〜6 を必要に応じて繰り返す

// 通常のWeb Workerの場合はimportScriptsを使って外部ソースのインポートが必要
// 今回はwebpackで処理するため、通常のソースと同じインポート文でOK
import * as marked from "marked";
import * as sanitizeHtml from "sanitize-html";

// Web Workerに変数をセット
// const worker: Worker　workerという変数は、Workerという型だと定義
// selfはWeb Worker自身 "self as any"はselfというグローバル変数の型はなんでもOKという意味
const worker: Worker = self as any;

// メインスレッドからデータを渡されたときに実行する関数
worker.addEventListener("message", (event) => {
  const text = event.data;
  // sanitizeHtml（無害化）でテキストエディタに書かれたHTMLがサイトに影響しなくさせる
  const html = sanitizeHtml(marked(text), {
    // 全てのタグを除外対象に追加 defaultsにh1タグとh2タグが含まれないため、手動で追加
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"],
  });
  worker.postMessage({ html });
});
