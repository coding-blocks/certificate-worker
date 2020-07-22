export default [
  {
    path: '/oneauth/callback'
  },
  {
    path: '/login'
  },
  {
    path: '/layouts/new',
    authenticated: true
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