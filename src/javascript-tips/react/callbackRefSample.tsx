// 参考: https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs

type Ref<T> = RefCallback<T> | RefObject<T> | null

const Sample = () => {

    const ref = React.useRef(null)

    // これは<input ref={ref} />以下のような記述のシンタックスシュガー
    return (
        <input
            ref={(node) => {
                ref.current = node;
            }}
            defaultValue="Hello world"
        />
    );
}

// 上記を応用 refの記述でheightをスマートに取得
function MeasureExample() {
    const [height, setHeight] = React.useState(0)

    const measuredRef = React.useCallback(node => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height)
        }
    }, [])

    return (
        <>
            <h1 ref={measuredRef}>Hello, world</h1>
            <h2>The above header is {Math.round(height)}px tall</h2>
        </>
    )
}