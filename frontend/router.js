export default [
  {
    path: '/oneauth/callback'
  },
  {
    path: '/login'
  },
  {
    path: '/layouts/:id',
    authenticated: true
  },
  {
    path: '/layouts',
    authenticated: true
  },
  {
    path: '/'
  }
]