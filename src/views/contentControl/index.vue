<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
        <el-form-item label="审核状态">
           <el-select v-model="isCheck" placeholder="请选择" @change="getContentList">
               <el-option v-for="item in items" :label="item.name" :value="item.id"></el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="记录Id">
           <el-input type="text" v-model="id" placeholder="请输入记录Id" @keyup.enter.native="getContentList" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getContentList">查询</el-button>
        </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="contents" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<!-- <el-table-column label="米" width="200"  sortable>
       <template slot-scope="scope">
           <img :src="scope.row.logo" width="40" height="40" class="head_pic"/>
       </template>
		 </el-table-column> -->
			<el-table-column prop="id" label="ID" width="150" sortable>
			</el-table-column>
			<el-table-column prop="createTime" label="时间" width="100" sortable>
			</el-table-column>
			<el-table-column label="用户头像" width="200" sortable>
        <template slot-scope="scope">
            <img :src="scope.row.avatar" width="40" height="40" class="head_pic"/>
        </template>
			</el-table-column>
		 </el-table-column>
			<el-table-column prop="userName" label="用户昵称" width="150" sortable>
			</el-table-column>
			<el-table-column prop="userId" label="用户ID" width="150" sortable>
			</el-table-column>
			<el-table-column prop="functionName" label="功能" width="150" sortable>
			</el-table-column>
			<el-table-column label="待审核图片" width="200" sortable>
				<template slot-scope="scope">
						<img :src="scope.row.content"  @click="showPicture(scope.$index, scope.row)" width="40" height="40" class="head_pic"/>
				</template>
			</el-table-column>
			<el-table-column prop="type" label="状态" width="150" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.isCheck==0" width="40" height="40" >未审核</span>
          <span v-if="scope.row.isCheck==1" width="40" height="40" >通过</span>
          <span v-if="scope.row.isCheck==2" width="40" height="40" >删除</span>
        </template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="handleOrder(scope.$index, scope.row)">通过</el-button>
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>

import store from '@/store'
import {selectContentList,passContentEntry,deleteContentEntry} from '@/api/contentControl'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
export default {
		data() {
			return {
				contents: [],
				total: 0,
				page: 1,
				pageSize:100,
				orderValue: '',
				listLoading: false,
				id:'',
				isCheck: 0,
				items:[{id:0,name:"未审核"},{id:1,name:"已通过"},{id:2,name:"已删除"}]
			}
		},
		methods: {
			//获取用户列表
			getContentList() {
				this.listLoading = true;
				NProgress.start();
				selectContentList(this.isCheck,this.id,this.page,this.pageSize).then(response => {
					console.log(response)
					this.contents=response.data.message.list
					this.total = response.data.message.count;
					this.listLoading = false;
					NProgress.done();
				}).catch(error => {
					this.listLoading = false;
					NProgress.done();
					console.log(error)
					reject(error)
				})
			},
			handleOrder(index,data){
				console.log(data.id)
				passContentEntry(data.id).then(res =>{
					console.log(res)
					this.getContentList()
				}).catch(error =>{
					console.log(error)
				})
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?用户违规图片将被删除', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start()
					deleteContentEntry(row.id).then((res) => {
						this.listLoading = false;
       			NProgress.done();
						this.getContentList();
					});
				}).catch(() => {
					this.listLoading = false;
					NProgress.done();
				});
			},
			//显示新增界面
			handleAdd: function () {

			},

			showPicture(index,data){
				console.log(data.content)
				window.open(data.content);
			},
		},
		mounted() {
			this.getContentList();
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
