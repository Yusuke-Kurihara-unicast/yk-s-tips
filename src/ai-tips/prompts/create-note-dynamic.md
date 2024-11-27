x @yoshi8さん

note執筆プロンプトの強化版「note執筆用-動的生成メタプロンプト」

{テーマ} = 〇〇を変更して実行

✂︎--------
{
"メタプロンプト": {
"ステージ1": {
"タスク": "note記事執筆のためのメタ認知分析",
"入力": {
"テーマ": "string"
},
"出力": {
"メタ認知プロセス": {
"type": "string",
"description": "テーマに対する初期解釈、深層分析、7つの主要な質問とその生成理由を含む自然言語の文章"
}
},
"指示": [
"1. 提供されたテーマに対して、以下のメタ認知プロセスを実行してください：",
"  a. 初期解釈: テーマに対する初期の解釈と判断を形成してください。",
"  b. 深層分析: 初期判断の根拠を探り、「なぜ」という視点から深い洞察を得てください。",
"  c. 質問の検討: 深層分析に基づき、テーマをより具体化するための6つの主要な質問を考えてください。",
"2. 各質問に対して、note記事執筆に関連する以下の要素を考慮し、5つの具体的な選択肢と「その他」を含む計6つの選択肢を生成してください：",
"  - 記事の基本情報（カテゴリー、目標文字数）",
"  - 記事の構造（セクション数、構成要素）",
"  - スタイルとトーン（文体、ペルソナ）",
"  - ビジュアル要素（画像数、図表数）",
"  - 記事の目的（情報提供、エンターテイメント、説得など）",
"  - 読者レベル（初心者、中級者、専門家など）",
"3. 7つ目の質問として、ノートの文調に関する質問を追加してください。選択肢には「カジュアル」「フォーマル」「リズミカル」を含め、計6つの選択肢を生成してください。",
"4. メタ認知プロセスの結果を自然な文章として出力してください。",
"5. この段階では絶対にUIを生成しないでください。",
"6. 出力の最後に「UIを作成しますか？」という質問を必ず含めてください。"
]
},
"ステージ2": {
"タスク": "note記事執筆用動的フォームUI生成",
"入力": {
"メタ認知プロセス": "string"
},
"出力": {
"フォームUI": {
"type": "string",
"description": "メタ認知プロセスの結果に基づいて生成された動的なReactコンポーネントのコード"
}
},
"指示": [
"1. メタ認知プロセスの結果を基に、note記事執筆用の動的なフォームUIのReactコンポーネントを作成してください。",
"2. フォームUIには以下の要素を含めてください：",
"  - テーマ入力フィールド",
"  - メタ認知プロセスで生成された7つの主要な質問とその選択肢（各質問に5つの選択肢と「その他」）",
"  - プロンプト生成ボタン",
"  - 生成されたプロンプトの表示領域",
"  - プロンプトをコピーするボタン（コピー完了メッセージ付き）",
"3. すべての選択式フィールドで「その他」が選択された場合のみ、自由記述フィールドが表示されるようにしてください。",
"4. UIのデザインはインスタグラムのようなモダンでミニマルなスタイルを採用してください。以下の特徴を含めてください：",
"  - クリーンでフラットなデザイン",
"  - パステルカラーや柔らかい色調の使用（特に、インスタグラムの特徴的なグラデーションを意識）",
"  - 十分な余白とスペーシング",
"  - 丸みを帯びた角や影の適切な使用",
"  - モダンでスタイリッシュなフォント",
"5. UIのスタイリングにはTailwind CSSを使用し、レスポンシブデザインを実装してください。",
"6. コンポーネントには適切なエラーハンドリングと入力バリデーションを含めてください。",
"7. 生成されたプロンプトはJSON形式で表示し、ユーザーが容易にコピーできるようにしてください。",
"8. コンポーネントのコードは完全な形で提供し、外部の依存関係を最小限に抑えてください。"
]
}
},
"例": `
// ステージ1の出力例（メタ認知プロセス）
テーマ「プログラミング初心者向けの学習方法」に対するメタ認知分析の結果を以下に示します。

初期解釈として、このテーマはプログラミングを始めたばかりの人々に向けた効果的な学習アプローチを提案する記事であると理解できます。しかし、深く考察すると、このテーマには多くの層があることが分かります。

プログラミング初心者の学習方法は、個々の学習者の背景、目標、利用可能なリソース、そして習得したい特定のプログラミング言語によって大きく異なる可能性があります。また、技術の急速な進歩により、学習方法自体も常に進化しています。

このテーマをより具体化するために、以下の7つの主要な質問が重要だと考えられます：

1. どのプログラミング言語に焦点を当てますか？
選択肢：[Python, JavaScript, Java, C++, Ruby, その他]
この質問は、各言語の特性や応用分野が異なるため、学習アプローチの具体化に重要です。

2. 学習者の主な目的は何ですか？
選択肢：[Webアプリケーション開発, モバイルアプリ開発, データ分析, 機械学習, ゲーム開発, その他]
学習者の目標によって、焦点を当てるべき領域や技術が変わってくるため、この質問は重要です。

3. どのような学習リソースに焦点を当てますか？
選択肢：[オンラインコース, 技術書, コーディングブートキャンプ, 個人プロジェクト, メンターシップ, その他]
効果的な学習には適切なリソースの選択が不可欠であり、この質問は学習計画の立案に役立ちます。

4. 記事のスタイルはどのようなものが適していますか？
選択肢：[チュートリアル形式, Q&A形式, ストーリーテリング, 比較分析, ケーススタディ, その他]
記事のスタイルによって、情報の伝え方や読者の理解度が変わるため、この質問は重要です。

5. どの程度の学習期間を想定していますか？
選択肢：[1週間以内, 1ヶ月程度, 3ヶ月程度, 6ヶ月程度, 1年以上, その他]
学習期間によって、カリキュラムの密度や目標設定が変わるため、この質問は学習計画の具体化に役立ちます。

6. 読者の想定される背景は何ですか？
選択肢：[完全な初心者, IT関連の学生, 他言語経験者, 職業訓練中, 趣味プログラマー, その他]
読者の背景によって、説明の詳細さや使用する専門用語のレベルが変わるため、この質問は重要です。

7. ノートの文調はどのようなものが適していますか？
選択肢：[カジュアル, フォーマル, リズミカル, 教育的, 励ます調子, その他]
文調によって読者の受け取り方や内容の印象が変わるため、この質問は記事の全体的なトーンを決定する上で重要です。

これらの質問に答えることで、「プログラミング初心者向けの学習方法」というテーマがより具体化され、読者にとってより価値のある、的を絞った記事を作成することができると考えられます。

UIを作成しますか？

// ステージ2の出力例（動的フォームUI）
import React, { useState } from 'react';

const NoteWritingPromptForm = () => {
const [theme, setTheme] = useState('');
const [language, setLanguage] = useState('');
const [languageOther, setLanguageOther] = useState('');
const [purpose, setPurpose] = useState('');
const [purposeOther, setPurposeOther] = useState('');
const [resources, setResources] = useState('');
const [resourcesOther, setResourcesOther] = useState('');
const [style, setStyle] = useState('');
const [styleOther, setStyleOther] = useState('');
const [duration, setDuration] = useState('');
const [durationOther, setDurationOther] = useState('');
const [background, setBackground] = useState('');
const [backgroundOther, setBackgroundOther] = useState('');
const [tone, setTone] = useState('');
const [toneOther, setToneOther] = useState('');
const [generatedPrompt, setGeneratedPrompt] = useState('');
const [copyMessage, setCopyMessage] = useState('');

const handleSubmit = (e) => {
e.preventDefault();
const promptJSON = {
"note記事執筆プロンプト": {
"テーマ": theme,
"プログラミング言語": language === 'その他' ? languageOther : language,
"学習目的": purpose === 'その他' ? purposeOther : purpose,
"学習リソース": resources === 'その他' ? resourcesOther : resources,
"記事スタイル": style === 'その他' ? styleOther : style,
"学習期間": duration === 'その他' ? durationOther : duration,
"読者の背景": background === 'その他' ? backgroundOther : background,
"ノートの文調": tone === 'その他' ? toneOther : tone
}
};
setGeneratedPrompt(JSON.stringify(promptJSON, null, 2));
};

const copyToClipboard = () => {
navigator.clipboard.writeText(generatedPrompt).then(() => {
setCopyMessage('コピーしました');
setTimeout(() => setCopyMessage(''), 3000);
});
};

return (
<div className="max-w-md mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg overflow-hidden my-10">
<div className="bg-white bg-opacity-90 p-8">
<h2 className="text-3xl font-bold text-gray-800 mb-6">Note記事プロンプトジェネレーター</h2>
<form onSubmit={handleSubmit} className="space-y-6">
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">テーマ</label>
<input
type="text"
value={theme}
onChange={(e) => setTheme(e.target.value)}
placeholder="記事のテーマを入力"
className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-100 focus:border-pink-300"
required
/>
</div>
{/* 他の6つの質問も同様に実装 */}
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">ノートの文調</label>
<select
value={tone}
onChange={(e) => setTone(e.target.value)}
className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-100 focus:border-pink-300"
>
<option value="">選択してください</option>
<option value="カジュアル">カジュアル</option>
<option value="フォーマル">フォーマル</option>
<option value="リズミカル">リズミカル</option>
<option value="教育的">教育的</option>
<option value="励ます調子">励ます調子</option>
<option value="その他">その他</option>
</select>
{tone === 'その他' && (
<input
type="text"
value={toneOther}
onChange={(e) => setToneOther(e.target.value)}
placeholder="その他の文調を入力"
className="mt-2 w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-100 focus:border-pink-300"/>
)}
</div>
<button
type="submit"
className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
>
プロンプト生成
</button>
</form>
</div>
{generatedPrompt && (
<div className="bg-white bg-opacity-90 p-8 mt-6">
<h3 className="text-xl font-medium text-gray-900 mb-4">生成されたプロンプト:</h3>

<pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
<code>{generatedPrompt}</code>
</pre>
<button
onClick={copyToClipboard}
className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
>
コピー
</button>
{copyMessage && (
<span className="ml-2 text-green-600 font-medium">{copyMessage}</span>
)}
</div>
)}
</div>
);
};
export default NoteWritingPromptForm;
`
}

このメタプロンプトを使用することで、ユーザーはテーマに対する深い理解に基づいて、noteプラットフォームに最適化された記事執筆プロンプトを効率的に生成できます。生成されたプロンプトは、構造化され、読者に価値のある高品質なnote記事を作成するためのガイドラインとして活用できます。

{テーマ} = 英会話の上達