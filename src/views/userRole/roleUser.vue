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


		<el-table :data="userRoles" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="userId" label="用户Id" width="200" sortable>
			</el-table-column>
			<el-table-column prop="userName" label="用户名" width="200" sortable>
			</el-table-column>
			<el-table-column prop="userRole" label="角色类型" width="200" sortable>
				<template slot-scope="scope">
					<span v-if="scope.row.userRole==0" width="40" height="40" >默认用户</span>
					<span v-if="scope.row.userRole==1" width="40" height="40" >一般管理员</span>
					<span v-if="scope.row.userRole==2" width="40" height="40" >超级管理员</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template slot-scope="scope">
					<el-button size="small" @click="setRole(scope.$index, scope.row)">角色</el-button>
				</template>
			</el-table-column>
		</el-table>

  	<el-dialog title="角色设置" :visible.sync="setRoleVisible" style="width:1000px" >
			<el-table :data="roleSetList" highlight-current-row style="width: 100%;">
				 <el-table-column prop="role" label="角色" width="150" sortable>
				 </el-table-column>
				 <el-table-column label="刷选" width="100">
						 <template scope="scope">
							 <el-radio class="radio" :label="scope.row.role" v-model="roleValue" @change.native="setCurrentRole(scope.$index, scope.row)"></el-radio>
						 </template>
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
		 		<el-button @click="setRoleVisible = false">取消</el-button>
		 		<el-button type="primary" :loading="roleSetloading" @click="addRoleUser(2)">确定</el-button>
		 	</div>
		</el-dialog>


    <el-dialog title="添加用户角色" :visible.sync="userRoleVisible" style="width:1000px" >
         <el-input :maxlength="15" style="width: 120px"
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
            <el-button type="primary" :loading="roleloading" @click="addRoleUser(1)">确定</el-button>
          </div>
    </el-dialog >



  </section>
</template>


<script>

import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

import {searchUserList,saveUserRole,getAllUserRoles} from '@/api/userrole'

export default {
		data() {
			return {
        userName:'',
        userList:[],
				userRoles:[],
        roleloading:false,
				listLoading:false,
        userloading:false,
        userRoleVisible:false,
        searchUserloading:false,
				setRoleVisible:false,
				roleSetloading:false,
        radio:0,
				roleValue:0,
		    roleSetList:[{"role":0},{"role":1},{"role":2}],
        userId:'',
        total:''
			}
		},
		methods: {
			//获取用户列表
		  addUserRole(){
         this.userRoleVisible=true;
      },
			setRole(index,data){
         this.setRoleVisible=true;
				 this.userId=data.userId;
				 this.roleValue=data.userRole;
			},
			getUserRoles(){
				this.listLoading=true;
				NProgress.start();
				getAllUserRoles().then(response => {
				 this.userRoles=response.data.message
				 this.listLoading = false;
				 NProgress.done();
			 }).catch(error => {
				 this.listLoading = false;
				 NProgress.done();
				 console.log(error)
				 reject(error)
			 })
			},
			addRoleUser(type){
				 if(type==1){
					 if(this.userId==""){
  					  console.log("请先选中用户");
  					  return;
  				 }
  				 this.roleloading=true;
  				 this.roleValue=0;
				 }else{
					 this.roleSetloading=true;
				 }
				 saveUserRole(this.userId,this.roleValue).then(response => {
					 if(type==1){
						 this.roleloading = false;
						 this.userRoleVisible=false;
					 }else{
						 this.roleSetloading=false;
						 this.setRoleVisible=false;
					 }
			     this.getUserRoles();
				 }).catch(error => {
					 if(type==1){
						  this.roleloading = false;
					 }else{
						  this.roleSetloading=false;
					 }
					 console.log(error)
					 reject(error)
				 })
			},
      getCurrentRow(index,data){
         this.radio=index;
         this.userId=data.userId;
      },
			setCurrentRole(index,data){
				 this.roleValue=data.role;
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
       this.getUserRoles()
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
