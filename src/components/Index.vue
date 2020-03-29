<template>
  <el-container class="el-container">
    <!-- header头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" style="width:60px;height:60px;" />
        <span>校园论坛管理后台</span>
      </div>
      <div style="margin-left: auto">
        <!-- 个人信息 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 退出按钮 -->
        <el-button class="logout" type="danger" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏（导航栏） -->
      <el-aside>
        <el-radio-group v-model="isCollapse" style="width:100%;background-color:#373d4e;">
          <el-radio-button :label="true" v-show="!isCollapse" style="width:100%;">
            <i class="el-icon-d-arrow-right"></i>
          </el-radio-button>
          <el-radio-button :label="false" v-show="isCollapse" style="width:100%;">
            <i class="el-icon-d-arrow-left"></i>
          </el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          active-text-color="#409EFF"
          background-color="#373d4e"
          text-color="#fff"
          :collapse="!isCollapse"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.url" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的目标区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span slot="title">{{item.name}}</span>
            </template>
            <div v-show="item.hasChildren">
              <!-- 二级菜单 -->
              <el-menu-item
                :index="subItem.id"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="addTab(subItem.id,subItem.name,subItem.url)"
              >
                <!-- 二级菜单的目标区域 -->
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-location"></i>
                  <!-- 文本 -->
                  <span slot="title">{{subItem.name}}</span>
                </template>
              </el-menu-item>
            </div>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面内容 -->
        <el-main>
          <!-- tab标签 -->
          <el-tabs
            v-model="activeTabUrl"
            type="border-card"
            closable
            @tab-remove="removeTab"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-for="(item, index) in tabs"
              :key="item.id"
              :label="item.title"
              :name="item.url"
              :index="index"
              :url="item.url"
            ></el-tab-pane>
          </el-tabs>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
        <!-- footer区域 -->
        <el-footer>Copyright © 2020 校园论坛管理后台. All rights reserved.</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 是否展开侧边菜单
      isCollapse: true,
      menuList: [
        {
          id: '2',
          name: '用户管理',
          icon: '',
          hasChildren: true,
          children: [
            {
              id: '3',
              name: '用户列表',
              icon: '',
              hasChildren: false,
              children: [{}],
              url: '/user'
            },
            {
              id: '4',
              name: '角色列表',
              icon: '',
              hasChildren: false,
              children: [{}],
              url: '/role'
            }
          ],
          url: ''
        }
      ],
      // tab
      //显示tab的id
      activeTabUrl: '/home',
      // 所有tab数据
      tabs: [
        {
          title: '首页',
          id: 1,
          url: '/home'
        }
      ]
    }
  },
  methods: {
    /**
     * 退出函数
     */
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // handleOpen(key, keyPath) {
    //     console.log(key, keyPath)
    // },
    // handleClose(key, keyPath) {
    //     console.log(key, keyPath)
    // },
    /**
     *添加tab
     * tagId: 标签id
     * tagTitle: 标签标题
     * tagUrl: 标签URL
     */
    addTab(tagId, tagTitle, tagUrl) {
      //跳到对应tab
      this.$router.push(tagUrl)
      //判断数组是否为空
      let tabs = this.tabs
      if (tabs == 0) {
        //放进tabs
        tabs.push({
          title: tagTitle,
          id: tagId,
          url: tagUrl
        })
      } else {
        //判断id是否存在
        let ids = Object.values(tabs).map(d => d.id)
        if (ids.indexOf(tagId) == -1) {
          //不存在
          //放进tabs
          tabs.push({
            title: tagTitle,
            id: tagId,
            url: tagUrl
          })
        }
      }
      //设置当前tab
      this.activeTabUrl = tagUrl
      //跳到对应tab
      this.$router.push(tagUrl)
    },
    /**
     *删除tab
     * rmTagId: 待标签id
     */
    removeTab(rmTagUrl) {
      console.log(rmTagUrl)
      if (rmTagUrl === '/home') return
      let tabs = this.tabs
      let activeTabUrl = this.activeTabUrl

      if (activeTabUrl === rmTagUrl) {
        tabs.forEach((tab, index) => {
          if (tab.url === rmTagUrl) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeTabUrl = nextTab.url
            }
          }
        })
      }
      //把下一个tab作为新tab
      this.activeTabUrl = activeTabUrl
      this.tabs = tabs.filter(tab => tab.url !== rmTagUrl)
      //跳到对应tab
      this.$router.push(activeTabUrl)
    },
    /**
     * tab点击
     */
    handleClick(clickTab) {
      console.log(clickTab)
      //跳到对应tab(name的值为URL)
      this.$router.push(clickTab.name)
      //设置当前tab
      let tabs = this.tabs
      tabs.forEach((tab, index) => {
        if (tab.name === clickTab.name) {
          this.activeTabUrl = tab.url
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 主体
.el-container {
  height: 100%;
}
// 导航栏
.el-header {
  background-color: #373d4e;
  color: #333;
  display: flex;
  // justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;
  }
}
// 个人信息下拉
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

// 左边菜单栏
.el-aside {
  background-color: #373d4e;
  color: #333;
  text-align: center;
  line-height: 0 !important;
  width: auto !important;
}
// 一级菜单的左右边距
.el-submenu_title {
  padding: 0 10px 0 0;
}
// 一级菜单右边下拉边框
.el-submenu_icon-arrow {
  right: 10px !important;
  color: #fff;
}
//
.el-menu-item {
  padding-left: 80px !important;
}
// 内容主体区域
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0 !important;
}
// footer区域
.el-footer {
  background-color: #373d4e;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  color: #fff;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
