

type Props = {
    children: string | null,
    hasRuby:boolean,
    className?: string,
    color?: string,
}

const Ruby: React.FC<Props> = ({
    children,
    hasRuby = false,
    className = '',
    color = '',
}) => {
    const generatedChildren = generateRuby(children, hasRuby);
    const result = flatMap(generatedChildren.split(':!:'), function (part) {
        return [part];
    });
    return (
        <span>
            {result.map((value, index) => {
                const rubyPattern = /\{(.*?)\|(.*?)\}/;
                const rubyArray = value.match(rubyPattern);
                if (rubyArray) {
                    return (
                        <ruby key={index}><span className={`${className} ${color}`}>{rubyArray[1]}</span>
                            <rt><span className={`${className} ${color} notranslate`}>{rubyArray[2]}</span></rt>
                        </ruby>
                    );
                } else {
                    return <span className={`${className} ${color}`} key={index}>{value}</span>;
                }
            })}
        </span>
    );
};

const flatMap = (array: Array<string>, fn) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        let mapping = fn(array[i]);
        result = result.concat(mapping);
    }
    return result;
};

const rubyPattern = /\{(.*?)\|(.*?)\}/g;
function generateRuby(string: string, hasRuby: boolean): string {
    let result = '';
    if (hasRuby) {
        result = string?.replace(rubyPattern, ':!:$&:!:');
    } else {
        result = string?.replace(rubyPattern, '$1');
    }
    return result;
};

export default Ruby;
