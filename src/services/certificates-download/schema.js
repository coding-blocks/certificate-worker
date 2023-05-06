// "layoutId": "abc",
// "callback": "something.com",
// "substitutions": {
//     "foo": "bar"
// }
module.exports = {
  GENERATE: {
    body: {
      type: 'object',
      properties: {
        layoutId: {
          type: 'string'
        },
        substitutions: {
          type: 'object'
        }
      }
    }
  }
}