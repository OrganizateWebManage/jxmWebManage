<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="类型">
           <el-select v-model="type" placeholder="请选择">
               <el-option v-for="item in items" :label="item.name" :value="item.id"></el-option>
           </el-select>
        </el-form-item>
				<el-form-item label="回调时间">
					 <el-input type="text" v-model="backTime" placeholder="分钟"/>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleOrder">添加</el-button>
        </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="contents" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="ID" width="150" sortable>
			</el-table-column>
			<el-table-column prop="appTime" label="应用回调时间（分钟）" width="150" sortable>
			</el-table-column>
			<el-table-column prop="backTime" label="定位回调时间（分钟）" width="150" sortable>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>

import store from '@/store'
import {getBlackAppList,addBlackEntry,addBlackOtherEntry} from '@/api/backTime'
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
				name: '',
				packageName:'',
				backTime:'',
				isCheck: 0,
				type:'',
				items:[{id:1,name:"应用回调"},{id:2,name:"定位回调"}]
			}
		},
		methods: {
			//获取用户列表
			getBlackList() {
				this.listLoading = true;
				NProgress.start();
				getBlackAppList().then(response => {
					console.log(response)
					this.contents=response.data.message;
					this.total = response.data.message.length;
					this.listLoading = false;
					NProgress.done();
				}).catch(error => {
					this.listLoading = false;
					NProgress.done();
					console.log(error)
					reject(error)
				})
			},


			handleOrder(){
				if(this.backTime==''){
					alert("频率时间不能为空");
					return;
				}
				if(this.type==1){
					addBlackEntry(this.backTime).then(res =>{
						console.log(res)
						this.getBlackList()
						this.name= '';
						this.packageName='';
					}).catch(error =>{
						console.log(error)
					})
				}else if(this.type==2){
					addBlackOtherEntry(this.backTime).then(res =>{
						console.log(res)
						this.getBlackList()
						this.name= '';
						this.packageName='';
					}).catch(error =>{
						console.log(error)
					})
				}else{
					alert("类型不能为空");
					return;
				}
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
			this.getBlackList();
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
