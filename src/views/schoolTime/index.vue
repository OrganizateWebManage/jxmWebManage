<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item label="类型">
           <el-select v-model="type2" placeholder="请选择">
               <el-option v-for="item in items" :label="item.name" :value="item.id"></el-option>
           </el-select>
        </el-form-item>
				<el-form-item label="开始时间">
					 <el-input type="text" v-model="startTime2" placeholder="HH:mm:ss" />
				</el-form-item>
				<el-form-item label="结束时间">
					 <el-input type="text" v-model="endTime2" placeholder="HH:mm:ss"/>
				</el-form-item>
				<el-form-item label="星期">
					 <el-input type="text" v-model="week2" placeholder="1-7"/>
				</el-form-item>
				<el-form-item label="日期">
					 <el-input type="text" v-model="dataTime2" placeholder="yyyy-MM-dd"/>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleOrder">添加</el-button>
        </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="contents" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="startTime" label="开始时间" width="150" sortable>
			</el-table-column>
			<el-table-column prop="endTime" label="结束时间" width="150" sortable>
			</el-table-column>
			<el-table-column prop="week" label="星期" width="150" sortable>
			</el-table-column>
			<el-table-column prop="dataTime" label="日期" width="150" sortable>
			</el-table-column>
			<el-table-column prop="type" label="类型" width="150" sortable>
				<template slot-scope="scope">
					<span v-if="scope.row.type==1" width="40" height="40" >常规</span>
					<span v-if="scope.row.type==2" width="40" height="40" >特殊</span>
				</template>
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
import {getBlackAppList,addBlackEntry,delBlackAppEntry,addBlackOtherEntry} from '@/api/schoolTime'
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
				startTime2:'',
				endTime2:'',
				week2:'',
				dataTime2:'',
				type2:'',
				isCheck: 0,
				items:[{id:1,name:"常规"},{id:2,name:"特殊"}]
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
				if(this.startTime2==''){
					alert("开始时间不能为空");
					return;
				}
				if(this.endTime2==''){
					alert("结束时间不能为空");
					return;
				}

				if(this.type2==1){
					if(this.week2==''){
						alert("星期不能为空");
						return;
					}
					addBlackEntry(this.startTime2,this.endTime2,this.week2).then(res =>{
						console.log(res)
						this.getBlackList()
						this.startTime2= '';
						this.endTime2='';
						this.week2=''
					}).catch(error =>{
						console.log(error)
					})
				}else if(this.type2==2){
					if(this.dataTime2==''){
						alert("日期不能为空");
						return;
					}
					addBlackOtherEntry(this.startTime2,this.endTime2,this.dataTime2).then(res =>{
						console.log(res)
						this.getBlackList()
						this.startTime2= '';
						this.endTime2='';
						this.dataTime2=''
					}).catch(error =>{
						console.log(error)
					})
				}else{
					alert("类型不能为空");
					return;
				}

			},
			//删除
			handleDel: function (index, row){
				this.$confirm('确认将该设置删除吗?', '提示', {
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
