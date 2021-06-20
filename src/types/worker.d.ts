// Webpack で Web Worker を処理するには worker-loader というライブラリが必要になる
// このファイルはworker-loaderをTypeScriptで使うために必要な型定義ファイル
// .d.tsという拡張子のファイルはTypeScriptの型定義ファイルとして認識される
// ライブラリの型定義ファイルが無いときは、こういう型定義ファイルを自分で用意することがある
// 公式ドキュメントに書いてあるコードそのまま

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
