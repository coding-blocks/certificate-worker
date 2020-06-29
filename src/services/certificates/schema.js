// "layoutId": "abc",
// "callback": "something.com",
// "substitutions": {
//     "foo": "bar"
// }
module.exports = {
  PUBLISH: {
    body: {
      type: 'object',
      properties: {
        layoutId: {
          type: 'string'
        },
        callback: {
          type: 'string'
        },
        substitutions: {
          type: 'object'
        }
      }
    }
  }
}