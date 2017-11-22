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
import {searchAppByCondition} from '@/api/searchmarket'

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
				this.listLoading = false;
				//NProgress.start();
				searchAppByCondition().then(response => {
					console.log(response)
					this.users=response.data.message
					this.total = response.data.message.length;
				}).catch(error => {
					// console.log(error)
					reject(error)
				})
				// getUserListPage(para).then((res) => {
				// 	this.total = res.data.total;
				// 	this.users = res.data.users;
				// 	this.listLoading = false;
				// 	//NProgress.done();
				// });
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					console.log(para);
					// removeUser(para).then((res) => {
					// 	this.listLoading = false;
          //
					// 	this.getUsers();
					// });
				}).catch(() => {

				});
			},
			//显示新增界面
			handleAdd: function () {

			}
		},
		mounted() {
			this.getApps();
		}
	}

</script>

<style scoped>

</style>
