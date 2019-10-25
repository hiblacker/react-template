import loadable from '@loadable/component'

const routes = [
  {
    path: '/',
    exact: true,
    component: loadable(() => import('@/view/index/index')),
  },
  {
    path: '/about',
    component: loadable(() => import('@/view/about/about')),
  },
]

export default routes
