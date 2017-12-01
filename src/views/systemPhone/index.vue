<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="名称">
					 <el-input type="text" v-model="name" placeholder="请输入名称" />
				</el-form-item>
				<el-form-item label="电话">
					 <el-input type="text" v-model="phone" placeholder="请输入电话"/>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleOrder">添加</el-button>
        </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="contents" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="name" label="名称" width="150" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="150" sortable>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>

import store from '@/store'
import {getBlackAppList,addBlackEntry,delBlackAppEntry} from '@/api/systemPhone'
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
				phone:'',
				isCheck: 0
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
				if(this.name==''){
					alert("名称不能为空");
					return;
				}
				if(this.phone==''){
					alert("电话不能为空");
					return;
				}
				addBlackEntry(this.name,this.phone).then(res =>{
					console.log(res)
					this.getBlackList()
					this.name= '';
					this.phone='';
				}).catch(error =>{
					console.log(error)
				})
			},
			//删除
			handleDel: function (index, row){
				this.$confirm('确认删除该常用电话?删除后所有用户都无法使用了！！', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					NProgress.start()
					console.log(row);
					console.log(row.id);
					delBlackAppEntry(row.id).then((res) => {
						console.log(row.id);
						this.listLoading = false;
						NProgress.done();
						this.getBlackList();
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
