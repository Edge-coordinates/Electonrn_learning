import * as request from 'superagent'


request
.get('https://v1.hitokoto.cn/?c=f&encode=text')
.then((res) => {
    console.log(res)
})
.catch((err) => {
    // err.message, err.response
})