// キャッシュの名前を定義 キャッシュ名に応じてキャッシュを提供
const CacheName = "Cache:v1";

// selfはサービスワーカー自身 installとactivateはライフサイクルの各イベント
self.addEventListener("install", (event) => {
  console.log("ServiceWorker install:", event);
});

self.addEventListener("activate", (event) => {
  console.log("ServiceWorker activate:", event);
});

const networkFallingBackToCache = async (request) => {
  // リクエストに対してレスポンスを保持する仕組みでキャッシュを提供
  const cache = await caches.open(CacheName);
  try {
    // fetchリクエストを実行してレスポンスを取得
    const response = await fetch(request);
    // レスポンス内容をキャッシュに保存 response.clone()でレスポンス内容をコピーしてから保存しなければいけない（一度しか読み取れない処理があるため）
    await cache.put(request, response.clone());
    // レスポンスを呼び出し元に返却
    return response;
  } catch (err) {
    console.error(err);
    // 適切なキャッシュが無い場合、戻り値はundefined
    return cache.match(request);
  }
};

// fetchとはネットワークなどを経由してリソースを取得するために使用するAPI
// ここにサービスワーカーが介入してリソース取得に対してさまざまな処理を挟む
self.addEventListener("fetch", (event) => {
  // event.respondWith 非同期処理の実行終了まで待機するメソッド
  event.respondWith(networkFallingBackToCache(event.request));
});
