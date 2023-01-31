const request = require('superagent')
const cheerio = require('cheerio')
var fs = require('fs')

let item_apis = [
    {
        name: '每日古诗',
        url: 'https://api.vvhan.com/api/en',
        type: 'xml',
        reskey: '',
    },
]
async function GetThings() {
    let lista = [{}, {}]
    let listb = [{}]
    let i = 0
    let api_item = item_apis[0]
    await request.get(api_item.url).then((res) => {
        if (res.status != 200) {
            listb[i].isshow = ref(-1)
            listb[i].title = '请求出错'
        } else {
            if (api_item.type == 'xml') {
                // var xmlText = res.body
                // var x2js = new X2JS()
                // var jsonObj = x2js.xml_str2json(xmlText)
                // //输出结果
                // console.log(jsonObj)
                console.log(res.body)
                // fs.writeFile('b.xml', res, (e) => {})
            } else if (api_item.type == 'json') {
            }
        }
    })
    // fs.writeFile('a.html', listb[i].data, (e) => {})
    // fs.writeFile('b.json', JSON.stringify(listb), (e) => {})
}

GetThings()
