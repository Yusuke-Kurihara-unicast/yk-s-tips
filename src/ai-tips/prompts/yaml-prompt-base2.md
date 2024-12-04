```
prompt:
  title: "プロンプトのタイトル"
  description: "生成したい内容の概要や目的を説明"

context:
  domain: "分野"
  audience: "想定される読者"
  tone: "トーン" # カジュアル、フォーマル

goal:
  objective: "プロンプトの目標"
  constraints: # 制約条件
    - 文字数制限
    - 専門用語の使用

input:
  data: # テキスト、リスト、数値

output:
  format: #　箇条書き、段落
  fierds:
    - name: フィールド名 # 要約など
      type: 型 # 文字列など
    - name: フィールド名 # 要約など
      type: 型 # 文字列など

examples:
  input: "具体的な入力例1" # 長文のテキスト
  output: "具体的な出力例2" # 要約
```

prompts: 基本情報
context: 使用場面やトーン対象読者の情報
goal: 目的や制約
input: 必要な入力タイプ
output: 出力の形式やフィールド
example: 具体例を示し使用方法を明確にする