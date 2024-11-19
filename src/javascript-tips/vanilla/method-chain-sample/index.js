// 参考：https://note.affi-sapo-sv.com/js-mnethod-chain.php

// メソッドチェーン考慮
const sampleObj = {
    value: 5,
    method1: function () {// objectそのものを返す
        this.value = this.value * 2;
        return this;
    },
    method2: function () {// valueを返す
        this.value = this.value * 3;
        return this.value;
    },

    // アローはthisを持っていないのでメソッドチェーン不可
    method3: () => {
        this.value = this.value * 4;
        return this.value;
    },
};

// 使用例
const test = sampleObj.method1().method2()


// プロトタイプ考慮(インスタンス経由)
const obj = function (value) {
    this.value = value;
};
obj.prototype = {
    method1: function () {
        this.value = this.value * 2;
        return this;
    },
    method2: function () {
        this.value = this.value * 3;
        return this;
    },
    method3: function () {
        this.value = this.value * 3;
        return this.value;
    }
};

// 使用例
const result = new obj(5).method1().method2().method3();
