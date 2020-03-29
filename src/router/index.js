import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import User from '@/components/User'
import Role from '@/components/Role'
import Home from '@/components/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/home',
      children:[{
        path: '/home',
        name: 'Home',
        component: Home
      },{
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/role',
        name: 'Role',
        component: Role
      },
      ]
    }
  ]
})

//挂载导航路由守卫（控制权限以及判断用户是否登录）
/**
 * to 要跳转的链接
 * from 来源路径
 * next 函数，表示放行（传入路径）
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  // 判断逻辑（是否要进行放行的逻辑）
  const token = window.sessionStorage.getItem('token')
  //if (!token) return next('/login');
  next()
})

export default router
