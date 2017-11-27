<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
        <el-form-item label="认证状态">
           <el-select v-model="type" placeholder="请选择" @change="getTeacherValidates">
               <el-option v-for="item in items" :label="item.name" :value="item.id"></el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="用户Id">
           <el-input type="text" v-model="userId" placeholder="请输入用户Id" @keyup.enter.native="getTeacherValidates" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getTeacherValidates">查询</el-button>
        </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="validates" highlight-current-row v-loading="listLoading" style="width: 100%;">

			<el-table-column label="头像" width="200" sortable>
        <template slot-scope="scope">
            <img :src="scope.row.avatar" width="40" height="40" class="head_pic"/>
        </template>
			</el-table-column>
			<el-table-column prop="name" label="昵称" width="200" sortable>
			</el-table-column>
			<el-table-column prop="userId" label="用户ID" width="200" sortable>
			</el-table-column>
			<el-table-column prop="type" label="是否认证" width="200" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.type==1" width="40" height="40" >申请</span>
          <span v-if="scope.row.type==2" width="40" height="40" >通过</span>
          <span v-if="scope.row.type==3" width="40" height="40" >拒绝</span>
        </template>
			</el-table-column>
      <el-table-column prop="communityList" label="管理社群">
        <template slot-scope="scope">
          <span v-for="item in scope.row.communityList">{{item}}</span>
        </template>
      </el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="handleAgree(scope.$index, scope.row)">同意</el-button>
          <el-button size="small" @click="handleRefuse(scope.$index, scope.row)">拒绝</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>

import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {selectTeacherList,addTeacherList} from '@/api/teachervalidate'
export default {
		data() {
			return {
				validates: [],
				total: 0,
				page: 1,
        pageSize:100,
        userId:'',
        type:0,
				listLoading: false,
        items:[{id:0,name:"全部"},{id:2,name:"同意"},{id:3,name:"拒绝"}]
			}
		},
		methods: {
			//获取用户列表
			getTeacherValidates() {
				this.listLoading = true;
				NProgress.start();
				selectTeacherList(this.userId,this.type,this.page,this.pageSize).then(response => {
					console.log(response)
					this.validates=response.data.message.list
					this.total = response.data.message.count
					this.listLoading = false;
					NProgress.done();
				}).catch(error => {
					this.listLoading = false;
					NProgress.done();
					console.log(error)
					reject(error)
				})
			},
      handleAgree(index,data){
        console.log(data.id)
        addTeacherList(2,data.id).then(res =>{
          console.log(res)
          this.getTeacherValidates()
        }).catch(error =>{
          console.log(error)
        })
      },
      handleRefuse(index,data){
        console.log(data.id)
        addTeacherList(3,data.id).then(res =>{
          console.log(res)
          this.getTeacherValidates()
        }).catch(error =>{
          console.log(error)
        })
      }
		},
		mounted() {
			this.getTeacherValidates();
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
</style>
