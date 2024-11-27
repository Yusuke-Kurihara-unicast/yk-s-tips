### よく忘れることとか書いておく
* 外部cssの読み込み
```
<!-- headタグの中に書く -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css" />
    <title>メディアレコーダー</title>
</head>
```

* 外部jsの読み込み
```
<!-- bodyタグの中に書く bodyタグの中の一番下に書くのが定石 asyncなどを記述して並列もあり -->
<body>
    <div>...</div>
    <script src="scripts.js"></script>
</body>

```

* Buttonを作成するときは基本的に明示的にtype="button"をつけるべき
  * デフォルトがtype="submit"なため..