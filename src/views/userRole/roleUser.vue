<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
        <el-form-item>
          <el-button type="primary" v-on:click="addUserRole">添加用户角色</el-button>
        </el-form-item>
			</el-form>
		</el-col>

    <el-dialog title="添加用户角色" :visible.sync="userRoleVisible" style="width:1000px" >
         <el-input :maxlength="6" style="width: 120px"
         size="small" type="text" v-model="userName" placeholder="用户名" ></el-input>
         <el-button type="primary" @click="searchList" :loading="searchUserloading">查询用户列表数据</el-button>
         <el-table :data="userList" highlight-current-row v-loading="userloading"  style="width: 100%;">
           <el-table-column label="用户头像" width="150"  sortable>
            <template slot-scope="scope">
                <img :src="scope.row.avator" width="40" height="40" class="head_pic"/>
            </template>
     			</el-table-column>
            <el-table-column prop="userName" label="用户名" width="150" sortable>
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" width="150" sortable>
            </el-table-column>
            <el-table-column label="刷选" width="100">
                <template scope="scope">
                  <el-radio class="radio" :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index, scope.row)"></el-radio>
                </template>
           </el-table-column>
         </el-table>
         <div slot="footer" class="dialog-footer">
            <el-button @click="userRoleVisible = false">取消</el-button>
            <el-button type="primary" :loading="roleloading" @click="addRoleUser">确定</el-button>
          </div>
    </el-dialog >



  </section>
</template>


<script>

import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

import {searchUserList} from '@/api/userrole'

export default {
		data() {
			return {
        userName:'',
        userList:[],
        roleloading:false,
        userloading:false,
        userRoleVisible:false,
        searchUserloading:false,
        radio:0,
        userId:'',
        total:''
			}
		},
		methods: {
			//获取用户列表
		  addUserRole(){
         this.userRoleVisible=true;
      },
			addRoleUser(){

			},
      getCurrentRow(index,data){
         this.radio=index;
         this.userId=data.userId;
      },
      searchList(){
         if(this.userName==""){
           console.log('搜索用户名不能为空!');
           return;
         }
         this.searchUserloading=true;
         this.userloading=true;
         NProgress.start();
 				 searchUserList(this.userName).then(response => {
 					this.userList=response.data.message.users
 					this.total=response.data.message.users.length
          this.userId=this.userList[0].userId;
          console.log(this.userId)
 					this.searchUserloading = false;
          this.userloading=false;
 					NProgress.done();
 				}).catch(error => {
 					this.searchUserloading = false;
          this.userloading=false;
 					NProgress.done();
 					console.log(error)
 					reject(error)
 				})
      }
		},
		mounted() {

		}
	}

</script>

<style>
.uptemp .el-upload-list {
	 	position: absolute;
	 	left: 140px;
	 	top: 0;
	 	width: 50%;
 }

 .uptemp {
	 position: relative;
 }

 .uptemp .el-upload-list .el-upload-list__item {
	 margin-top: 0;
 }

 .el-dialog__wrapper{
   overflow:hidden!important;
 }

 .el-dialog{
   width: 60%!important;
 }

 .el-table{
    overflow: auto!important;
    height: 200px;
 }
</style>
