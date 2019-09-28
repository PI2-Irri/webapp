const routes = [
  {
    path: '',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'root',
        component: () => import('pages/Login.vue')
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('pages/SignUp.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/Login.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
