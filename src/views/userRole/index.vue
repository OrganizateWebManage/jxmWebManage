<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
        <el-form-item>
          <el-button type="primary" v-on:click="addRoleInfo">加入角色数据</el-button>
        </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="roleUserList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="role" label="角色" width="200" sortable>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="searchUrls(scope.$index, scope.row)">查看路径</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="查看路径" :visible.sync="searchUrlVisible" style="width:900px">
				 <el-table :data="urlRoleList" highlight-current-row v-loading="urlloading" style="width: 100%;">
						<el-table-column prop="path" label="路径" width="200" sortable>
						</el-table-column>
				 </el-table>
				 <div slot="footer" class="dialog-footer">
						<el-button @click="searchUrlVisible = false">取消</el-button>
					</div>
		</el-dialog >



    <el-dialog title="添加角色" :visible.sync="roleVisible" style="width:900px">
         <el-input @change="checkNo(role)" :maxlength="6" style="width: 120px"
				 size="small" type="text" v-model="role"></el-input>
				 <el-table :data="pathRoleList" highlight-current-row v-loading="pathloading" @selection-change="handleSelectionChange" style="width: 100%;">
					 	<el-table-column type="selection" :reserve-selection="true" width="50" prop="id">
	 			 		</el-table-column>
		 			 	<el-table-column prop="path" label="路径" width="200" sortable>
		 				</el-table-column>
		 		 </el-table>
				 <div slot="footer" class="dialog-footer">
					 	<el-button @click="roleVisible = false">取消</el-button>
						<el-button type="primary"  @click="setRole()" :loading="roleloading">设置角色</el-button>
					</div>
		</el-dialog >

	</section>
</template>

<script>

import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {getUserRoleOfPathDTO,saveUserRoleOfPath} from '@/api/userrole'
import {constantPaths} from '@/router'

export default {
		data() {
			return {
				roleUserList: [],
				urlRoleList:[],
				listLoading: false,
				roleVisible: false,
				pathRoleList:constantPaths,
				roleloading:false,
				pathloading:false,
				searchUrlVisible:false,
				urlloading:false,
				selectedData:[],
				role:''
			}
		},
		methods: {
			//获取用户列表
			getRoleUserList() {
				this.listLoading = true;
				NProgress.start();
				getUserRoleOfPathDTO().then(response => {
					console.log(response)
					this.roleUserList=response.data.message
					this.total = response.data.message.length
					this.listLoading = false;
					NProgress.done();
				}).catch(error => {
					this.listLoading = false;
					NProgress.done();
					console.log(error)
					reject(error)
				})
			},
			checkNo(value){
				let reg= /^[1-9]\d*$/;
				if(value){
					if(value>999999||new RegExp(reg).test(value)==false){
						setTimeout(()=>{
							  this.role='';
						},500);
					}
				}
			},
      searchUrls(index,data){
				 this.searchUrlVisible=true;
         var paths=data.paths;
				 var roleList=new Array();
				 for(var i in paths){
					 var item={};
					 item.path=paths[i];
					 roleList.push(item);
				 }
				 this.urlRoleList=roleList;
      },
			setRole(){
         if(this.role==''){
					 console.log("角色不能为空");
					 return;
				 }
				 if(this.selectedData.length>0){
					 var pathStr="";
					 for(var i in this.selectedData){
					    if(pathStr===""){
								pathStr=this.selectedData[i];
							}else{
								pathStr=pathStr+","+this.selectedData[i];
							}
					 }
					 this.roleloading=true;
					 saveUserRoleOfPath(pathStr,this.role).then(response => {
						  console.log(response)
							this.roleloading=false;
						  this.roleVisible=false;
              this.getRoleUserList();
					 }).catch(error => {
						  this.roleloading=false;
						  console.log(error)
						  reject(error)
					 })
				 }else{
					 console.log("选填页面不能为空!");
					 return;
				 }
			},
			addRoleInfo(){
				this.roleVisible=true;
			},
			handleSelectionChange(rows) {
        this.selectedData = [];
        if (rows) {
					rows.forEach(row => {
            if (row) {
              this.selectedData.push(row.path);
            }
          });
        }
        console.log(this.selectedData);
     }
		},
		mounted() {
			this.getRoleUserList();
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
