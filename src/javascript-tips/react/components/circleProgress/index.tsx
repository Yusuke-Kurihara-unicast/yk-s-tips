export const CercleProgress = ({
    maxScore = 0,
    score = 0,
}) => {
    const percent = (score / maxScore) * 100;
    const backGroundStrokeColor = '#e5e7eb';
    const green = '#64b84a';
    const red = '#d03801';
    const yellow = '#fdcd01';
    const progressBarColor = (percent < 20)
        ? red
        : (20 <= percent && percent < 60)
            ? yellow
            : green;
    const cercleCenterX = 40;
    const cercleCenterY = 40;
    const radius = 28; // 半径
    const circumference = 2 * Math.PI * radius; // 円周
    const graphStartAngle = 270; // 円グラフの開始位置の角度
    const barWidth = 8; // 扇形グラフのバーの幅

    return (
        <div className='mx-auto relative w-full h-auto' style={{ minWidth: '200px', }}>
            <style>
                {/* プログレスバーのアニメーションの定義 */}
                {`@keyframes spinner {
                    0% {
                        stroke-dasharray: 0 ${circumference};
                    }
                    100% {
                        stroke-dasharray: ${circumference * (score / maxScore)} ${circumference};
                    }
                }`}
            </style>
            <svg viewBox='0 0 80 80'>
                {/* 円形プログレスバー背景 */}
                <circle
                    cx={cercleCenterX} cy={cercleCenterY} r={radius}
                    fill='transparent'
                    stroke={backGroundStrokeColor}
                    strokeDasharray={circumference}
                    strokeWidth={barWidth}
                    transform={`rotate(${graphStartAngle} ${cercleCenterX} ${cercleCenterY})`}
                />

                {/* 円形プログレスバー進捗 */}
                <circle
                    cx={cercleCenterX} cy={cercleCenterY} r={radius}
                    fill='transparent'
                    strokeWidth={barWidth}
                    stroke={progressBarColor}
                    strokeDasharray={`${circumference * (percent / 100)} ${circumference}`}
                    transform={`rotate(${graphStartAngle} ${cercleCenterX} ${cercleCenterY})`}
                    style={{ animation: 'spinner 1.5s ease-out' }}
                />

                {/* 点数 */}
                <text x='48%' y='50%' textAnchor='middle' fontSize='14' fontWeight='bold'>
                    {score}
                </text>
                <text x='63%' y='50%' textAnchor='middle' fontSize='5' fontWeight='bold'>
                    点
                </text>

            </svg>
        </div>
    );
};