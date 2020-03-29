<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 导航栏 */
.el-radio-button__inner {
  width: 100% !important;
  background-color: #373d4e;
  border: none !important;
  color: #fff;
}
/* 导航栏第一个子元素 */
.el.radio-button:first-child {
  border-left: none;
}
/* tab栏 */
.el-tabs__content {
  padding: 0 !important;
}
/* 导航栏的icon */
.el-submenu__title i {
  color: #fff !important;
}
</style>
