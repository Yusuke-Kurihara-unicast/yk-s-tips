// スプレッド構文を利用して、条件によってオブジェクトを操作
const a = {
    ...(someCondition && { b: 5 })
}

const b = {
    ...(someCondition ? { b: 5 } : {})
}

const arr = [
    ...(isConditionTrue() ? [{
        key: 'value'
    }] : [])
];