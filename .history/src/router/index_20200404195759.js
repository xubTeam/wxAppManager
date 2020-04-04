import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Home from '@/components/Home'
import User from '@/components/User'
import Role from '@/components/Role'
import Article from '@/components/Article'
import Attendance from '@/components/Attendance'
import AttendanceDetail from '@/components/AttendanceDetail'
import Class from '@/components/Class'
import File from '@/components/File'
import Lesson from '@/components/Lesson'
import LessonArrangement from '@/components/LessonArrangement'
import ModifyPwd from '@/components/ModifyPwd'
import Permission from '@/components/Permission'
import PersonInfo from '@/components/PersonInfo'
import Student from '@/components/Student'
import Teacher from '@/components/Teacher'


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
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/attendance',
        name: 'Attendance',
        component: Attendance
      },
      {
        path: '/attendanceDetail',
        name: 'AttendanceDetail',
        component: AttendanceDetail
      },
      {
        path: '/class',
        name: 'Class',
        component: Class
      },
      {
        path: '/file',
        name: 'File',
        component: File
      },
      {
        path: '/lesson',
        name: 'Lesson',
        component: Lesson
      },
      {
        path: '/lessonArrangement',
        name: 'LessonArrangement',
        component: LessonArrangement
      },
      {
        path: '/modifyPwd',
        name: 'ModifyPwd',
        component: ModifyPwd
      },
      {
        path: '/permission',
        name: 'Permission',
        component: Permission
      },
      {
        path: '/personInfo',
        name: 'PersonInfo',
        component: PersonInfo
      },
      {
        path: '/student',
        name: 'Student',
        component: Student
      },
      {
        path: '/teacher',
        name: 'Teacher',
        component: Teacher
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
