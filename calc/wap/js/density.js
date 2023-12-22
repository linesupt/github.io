var json = [
    {
        "symbol": "kg/dm³",
        "ratio": 1000,
        "ename": "Kgdm",
        "name": "千克/立方分米",
        "tname": "千克/立方分米"
    },
    {
        "symbol": "kg/cm³",
        "ratio": 1000000,
        "ename": "Kgcm",
        "name": "千克/立方厘米",
        "tname": "千克/立方厘米"
    },
    {
        "symbol": "g/m³",
        "ratio": 0.001,
        "ename": "Gm",
        "name": "克/立方米",
        "tname": "克/立方米"
    },
    {
        "symbol": "g/dm³",
        "ratio": 1,
        "ename": "Gdm",
        "name": "克/立方分米",
        "tname": "克/立方分米"
    },
    {
        "symbol": "g/cm³",
        "ratio": 1000,
        "ename": "Gcm",
        "name": "克/立方厘米",
        "tname": "克/立方厘米"
    },
    {
        "symbol": "",
        "ratio": 16.01846337396,
        "ename": "Poundft",
        "name": "磅/立方英尺",
        "tname": "磅/立方英尺"
    },
    {
        "symbol": "",
        "ratio": 99.77615978531,
        "ename": "Poundukgal",
        "name": "磅/英加仑",
        "tname": "磅/英加侖"
    },
    {
        "symbol": "",
        "ratio": 27679.904710203,
        "ename": "Poundin",
        "name": "磅/立方英寸",
        "tname": "磅/立方英寸"
    },
    {
        "symbol": "",
        "ratio": 119.82680826333,
        "ename": "Poundusgal",
        "name": "磅/美加仑",
        "tname": "磅/美加侖"
    },
    {
        "symbol": "",
        "ratio": 2.8527823899371,
        "ename": "Poundlbbl",
        "name": "磅/桶(石油)",
        "tname": "磅/桶(石油)"
    }
];

var app = new Vue({
    el: '#app',
    data: {
        number: "",
        array: json,
        numArr: [],
        noChangeTarget: {}
    },
    methods: {
        toNonExponential: function (num) {
            var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
            return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
        },
        num: function (numb) {
            var inputNum = numb;
            if (numb > 10000000 || numb < 0.0000001) {
                inputNum = numb.toLocaleString().split(",").join("")
            }
            if (inputNum.toString().length > 15) {
                if (inputNum.toString().match(/\./)) {
                    var tempArr = inputNum.toString().split(".");
                    if (tempArr[0].length >= 15) {
                        inputNum = Number(tempArr[0]);
                    } else {
                        var extra = 15 - tempArr[0].length;
                        var t = tempArr[1].split("");
                        t.splice(extra);
                        tempArr[1] = t.join("");
                        inputNum = Number(tempArr.join("."));
                    }
                }
            }
            if (!inputNum.toString().match(/\./)) {
                var returnNum = !inputNum.toString().match(/e/) ? inputNum.toString() : inputNum.toLocaleString().split(",").join("");
                if (returnNum.match(/e/)) {
                    return inputNum.toLocaleString().split(",").join("");
                } else {
                    return returnNum;
                }
            } else {
                return (this.toNonExponential(((inputNum * Math.pow(10, 14)).toFixed(1)) / Math.pow(10, 14))).toString()
            }
        },
        inputCheck(n) {
            n.target.value = n.target.value.replace(/[^\d\.]/ig, '')
            this.number = n.target.value.replace(/[^\d\.]/ig, '');
            n.target.value = n.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/ig, "");
            this.number = n.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/ig, "");
            if (n.data === "e") {
                n.target.value = n.target.value.replace(/e/ig, "");
                this.number = Number(n.target.value.replace(/e/ig, ""))
            } else {
                this.number = this.number ? this.number.replace(/[^\d\.]/ig, '') : "";
            }
            if (this.number) {
                if (this.number.toString().match(/\./)) {
                    var tempStr = this.number.toString();
                    var tempArr = tempStr.split(".");
                    if (tempArr[0].length >= 18) {
                        this.number = Number(tempArr[0]);
                    } else if (tempArr[1].length >= (18 - tempArr[0].length - 1)) {
                        var flag = 18 - tempArr[0].length - 1;
                        tempArr[1].split("").splice(flag);
                        this.number = Number(tempArr.join("."))
                    }
                } else {
                    if (this.number.length >= 18) {
                        var tempArr = this.number.toString().split("");
                        tempArr.splice(17);
                        this.number = parseInt(tempArr.join(""))
                    }
                }
            }
        },
        inputBottom(e, radio, ename) {
            e.target.value = e.target.value ? e.target.value.replace(/[^0-9\.]/ig, '') : "";
            if (e.target.value) {
                if (e.target.value.length > 15) {
                    if (e.target.value.match(/\./)) {
                        var tempArr = e.target.value.split(".");
                        if (tempArr[0].length >= 15) {
                            e.target.value = Number(tempArr[0]);
                        } else {
                            var extra = 15 - tempArr[0].length;
                            var t = tempArr[1].split("");
                            t.splice(extra);
                            tempArr[1] = t.join("");
                            e.target.value = tempArr.join(".");
                        }
                    } else {
                        if (e.target.value.length >= 15) {
                            var tempArr = e.target.value.split("");
                            tempArr.splice(15);
                            e.target.value = tempArr.join("")
                  cf      }
                    }
                }
                this.noChangeTarget.ename = ename;
                this.noChangeTarget.value = e.target.value;
                if ((e.target.value * radio).toString().match(/e/)) {
                    this.number = Number((e.target.value * radio).toLocaleString().split(",").join(""));
                } else {
                    this.number = Number(e.target.value * radio);
                }
                this.number = Number(e.target.value * radio);
            } else {
                this.noChangeTarget.value = "";
                this.number = "";
            }
        }
    },
})


