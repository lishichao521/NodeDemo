var request = require('superagent');
// var options = {
//   // host: '192.168.1.15',
//   host: '192.168.1.16',
//   port: 8080,
//   path: '/user/org/query_site_name',
//   method: 'POST',
//   headers: headers
// };
// var headers = {
//   'Content-Type': 'application/json',
// };
// var U = 'http://10.163.126.142:8080/user'
var U = 'http://192.168.1.16:8080/user'
var PostRequest = (D, url) => {
  console.log(D)
  return request
    .post(`${U + url}`)
    .send(D)
    .then(res => {
      if (res.status === 200) {
        return JSON.parse(res.text)
      }
    })
    .catch(err => {
      console.log('aaaaaaaaaa')
      return { code: 404, msg: '未知异常' }
    })
}
var GetRequest = (D, url) => {
  return request
    .post(`${U + url}`)
    .query(D)
    .then(res => {
      if (res.status === 200) {
        return JSON.parse(res.text)
      }
    })
    .catch(err => {
      console.log('aaaaaaaaaa')
      return { code: 404, msg: '未知异常' }
    })
}
exports.PostRequest = PostRequest;
exports.GetRequest = GetRequest;