<template>
  <div>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索区域 -->
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="6">
          <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="user.nickName" placeholder="请输入昵称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="user.realName" placeholder="请输入真实名称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="6">
          <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="user.address" placeholder="请输入地址"></el-input>
        </el-col>
        <el-col :span="12">
          <div class="block">
            <el-date-picker
              v-model="dateRange"
              @change="pickTime"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              range-separator="至"
              start-placeholder="创建开始时间"
              end-placeholder="创建结束时间"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5" style="margin-top:20px;">
        <el-col :span="1" :offset="20">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" icon="el-icon-plus">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="5" style="margin-top:20px;">
        <el-col :span="1">
          <el-button type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="tableData" ref="userTable" style="width: 100%" stripe border max-height="600">
          <!-- 多选框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="id" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑<i class="el-icon-edit-outline"></i></el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除<i class="el-icon-delete"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100, 200, 500, 1000]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userName: '',
        nickName: '',
        realName: '',
        phone: '',
        email: '',
        address: '',
        gendar: 0,
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      //   时间范围
      dateRange: '',
      // 当前页
      currentPage: 1,
      // 每页数据量
      pageSize: 10,
      // 总数量
      totalNum: 0,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    // 选择时间
    pickTime() {
      this.user.startTime = this.dateRange[0]
      this.user.endTime = this.dateRange[1]
    },
    //   搜索
    search() {
      console.log(this.user)
    },
    // 页面数据量变化
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`)
      this.user.pageSize = pageSize
    },
    // 页面页数变化
    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`)
      this.user.pageNum = currentPage
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row)
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row)
    },
    batchDelete(){
         const _selectData = this.$refs.userTable.selection
         console.log(_selectData)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
