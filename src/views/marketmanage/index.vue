<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item> -->
				<!-- <el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item> -->
				<el-form-item>
					<el-upload
		 					class="upload-demo"
		 					multiple="false"
		 					action=""
		 					:on-preview="handlePreview"
		 					:on-remove="handleRemove"
		 					:on-change="handleChange"
		 					:before-upload="beforeUpload"
		 					:auto-upload="false"
		 					:multiple="false">
		 					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
		 					<!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">导入</el-button> -->
		 					<div slot="tip" class="el-upload__tip">只能上传apk文件</div>
	 				</el-upload>
				</el-form-item>
				<!-- <el-form-item> -->
				<!-- </el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column label="应用图标" width="200"  sortable>
       <template scope="scope">
           <img :src="scope.row.logo" width="40" height="40" class="head_pic"/>
       </template>
			</el-table-column>
			<el-table-column prop="appName" label="应用名称" width="200" sortable>
			</el-table-column>
			<el-table-column prop="appPackageName" label="包名" width="200" sortable>
			</el-table-column>
			<el-table-column prop="size" label="安装包大小" width="200" sortable>
			</el-table-column>
			<el-table-column prop="versionName" label="版本号" width="200" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="排序" width="200" sortable>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>

import store from '@/store'
import {importApkFile} from '@/api/uploadFile'
import {searchAppByCondition,deleteApk} from '@/api/searchmarket'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
export default {
		data() {
			return {
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
			}
		},
		methods: {
			//获取用户列表
			getApps() {
				this.listLoading = true;
				NProgress.start();
				searchAppByCondition().then(response => {
					console.log(response)
					this.users=response.data.message
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
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start()
					deleteApk(row.id).then((res) => {
						this.listLoading = false;
       			NProgress.done();
						this.getApps();
					});
				}).catch(() => {
					this.listLoading = false;
					NProgress.done();
				});
			},
			//显示新增界面
			handleAdd: function () {

			},
		 	handleRemove(file) {
			 		console.log("handleRemove");
		 	},
		 	handlePreview(file) {
			 		console.log("handlePreview");
		 	},
		 	handleChange(file){
			 		console.log("handleChange");
					console.log(file.raw);
					let type = file.name.split('.')
      		if (type[1] === 'apk') {
							console.log("格式正确")
      		} else {
						  console.log("上传文件只能是 apk 格式!")
        			return false
      		}
					this.listLoading = true;
					var formdata = new FormData();
	        formdata.append('file',file.raw);
					importApkFile(formdata).then(response => {
						console.log(response)
						this.listLoading = false;
						this.getApps();
					}).catch(error => {
						console.log(error)
						this.listLoading = false;
						reject(error)
					})
		 	},
		 	beforeUpload: function (file) {
			 		console.log("beforeUpload")
			 		//这里是重点，将文件转化为formdata数据上传
		 	}
		},
		mounted() {
			this.getApps();
		}
	}

</script>

<style scoped>
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
