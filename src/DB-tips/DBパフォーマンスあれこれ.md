## 適切な正規化
* 基本はした方がよい。
* 冗長な更新などが発生したりする
* 場合によっては非正規化した方が速度が出る場合があるが、基本は推奨されない
  * あまりにも再結合が多い。レコード数が少ない上に結合先も少ないなど

## インデックスの作成
* 基本はBtreeを選択（選択しなければBtreeになるものがほとんど）
  * Btreeはオールラウンダー
* 何でもかんでも作成すればいいわけではない
* レコード数が増えてきた時は再作成も視野に
* 大量のデータをinsertなどする時は一度削除して再作成するといいかも
  * いんでくっすもファイル（だったと思う）なので、大量の更新があると更新に時間がかかってしまう。
  * ならいっそ更新が終わった後に一度行う方が良い