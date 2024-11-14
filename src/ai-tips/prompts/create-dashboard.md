ダッシュボード生成(一般化)

使い方
① プロンプトをv0にコピペ
② 「ゴール＝〇〇」と送信
③ プロンプトが生成される
④ 「1つのファイルで全て実装」と送信

✂︎--------

instructions:
  - ユーザーは {ゴール} = 〇〇 の形式で入力します
  - {ゴール} の内容に基づいて、以下の変数の値を適切に決定してください
  - 決定した変数の値を使用して、具体的なダッシュボード仕様を生成してください

project:
  name: {プロジェクト名}
  description: Next.jsを使用した4ページの{業種}管理ダッシュボード

tech_stack:
  - React
  - Next.js
  - shadcn/ui
  - Framer Motion
  - Tailwind CSS
  - Lucide React (アイコン)
  - Recharts (データ可視化)

pages:
  - name: {ページ1名}
    components:
      - {コンポーネント1名}:
          type: {グラフタイプ1}
          data: {データタイプ1}
          tech: Recharts, Framer Motion
      - {コンポーネント2名}:
          type: {UIコンポーネントタイプ1}
          tech: shadcn/ui Table
      - {コンポーネント3名}:
          type: {UIコンポーネントタイプ2}
          tech: shadcn/ui Progress
      - {コンポーネント4名}:
          type: {表示タイプ1}
          tech: Lucide React
      - {コンポーネント5名}:
          type: {UIコンポーネントタイプ3}
          tech: shadcn/ui DatePicker

  - name: {ページ2名}
    components:
      - {コンポーネント6名}:
          type: {UIコンポーネントタイプ4}
          tech: shadcn/ui DataTable
      - {コンポーネント7名}:
          type: {UIコンポーネントタイプ4}
          tech: shadcn/ui DataTable
      - {コンポーネント8名}:
          type: {グラフタイプ2}
          tech: Recharts
      - {コンポーネント9名}:
          type: {UIコンポーネントタイプ5}
          tech: shadcn/ui Card
      - {コンポーネント10名}:
          type: {UIコンポーネントタイプ6}, {UIコンポーネントタイプ7}
          tech: shadcn/ui Input, Select

  - name: {ページ3名}
    components:
      - {コンポーネント11名}:
          type: {グラフタイプ3}
          tech: Recharts, Framer Motion
      - {コンポーネント12名}:
          type: {グラフタイプ4}
          tech: Recharts, Framer Motion
      - {コンポーネント13名}:
          type: {グラフタイプ5}
          tech: Recharts, Framer Motion
      - {コンポーネント14名}:
          type: {UIコンポーネントタイプ1}
          tech: shadcn/ui Table
      - {コンポーネント15名}:
          type: {UIコンポーネントタイプ1}
          tech: shadcn/ui Table

  - name: {ページ4名}
    components:
      - {コンポーネント16名}:
          type: {グラフタイプ5}
          tech: Recharts
      - {コンポーネント17名}:
          type: {グラフタイプ4}, {UIコンポーネントタイプ1}
          tech: Recharts
      - {コンポーネント18名}:
          type: {グラフタイプ3}
          tech: Recharts
      - {コンポーネント19名}:
          type: {グラフタイプ6}
          tech: Recharts
      - {コンポーネント20名}:
          type: {UIコンポーネントタイプ1}
          tech: shadcn/ui Table

common_features:
  - {共通機能1}:
      tech: Tailwind CSS
  - {共通機能2}:
      tech: shadcn/ui Toggle
  - {共通機能3}:
      tech: shadcn/ui Button
  - {共通機能4}:
      tech: Next.js App Router
  - {共通機能5}:
      tech: Framer Motion
  - {共通機能6}:
      tech: shadcn/ui Skeleton
  - {共通機能7}:
      tech: shadcn/ui Toast
  - {共通機能8}:
      tech: Lucide React icons

変数決定のガイドライン:
  プロジェクト名: {ゴール}に基づいた簡潔な名前
  業種: {ゴール}から推測される業界や分野
  ページ名: {ゴール}に関連する4つの主要な管理領域
  コンポーネント名: 各ページの目的に沿った具体的な機能や表示要素
  グラフタイプ: 折れ線グラフ、棒グラフ、円グラフ、散布図など、データの性質に適したもの
  データタイプ: 時系列、カテゴリ別、比較データなど、{ゴール}に関連する適切なデータ
  UIコンポーネントタイプ: テーブル、カード、フォーム、ボタンなど、機能に適したUI要素
  表示タイプ: アイコン、バッジ、ラベルなど、情報の簡潔な表現方法
  共通機能: レスポンシブデザイン、ダークモード、データ更新など、一般的なダッシュボード機能
9月4日 16:25
