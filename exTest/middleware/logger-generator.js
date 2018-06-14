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
var PostRequest = (D)=> {
  return request
    .post('http://10.163.126.142:8080/user/org/query_site_name')
    .withCredentials()
    .send(D)
    .then(res => {
      if (res.status === 200) {
        return JSON.parse(res.text)
      }
    })
}
exports.PostRequest = PostRequest;