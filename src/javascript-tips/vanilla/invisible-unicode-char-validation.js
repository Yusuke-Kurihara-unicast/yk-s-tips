// ユニコードには表示されないが、１文字としてカウントされてしまう文字が存在する
// 参考:https://qiita.com/laineus/items/2d168a57fdbf7cd7c9c3

// この例では見えない文字を見つけるのではなく、見える文字が１文字以上含まれていることを検証している
if (!name.match(/[a-zA-Zぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠]/)) return false