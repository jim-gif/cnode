<template>
	<div class="UserInfo">
		<div class="userInfomation">
			<section>
				<img :src="userinfo.avatar_url" :title="userinfo.loginname">
				<span>{{userinfo.loginname}}</span>
				<p>{{userinfo.score}} 积分</p>
				<p>注册时间：{{userinfo.create_at | formatDate}}</p>
			</section>
			<div class="replies">
				<p>回复的主题</p>
				<ul>
					<li v-for="item in userinfo.recent_replies">
						<router-link
							:to="{name: 'post_content',params: {id: item.id, name: item.author.loginname}}"
							:title="item.title"
						>{{item.title}}</router-link>
					</li>
				</ul>
			</div>
			<div class="topics">
				<p>创建的主题</p>
				<ul>
					<li v-for="item in userinfo.recent_topics">
						<router-link
							:to="{name: 'post_content', params: {id: item.id, name:item.author.loginname}}"
							:title="item.title"
						>{{item.title}}</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserInfo',
	data() {
		return {
			userinfo: {}
		}
	},
	methods: {
		getData() {
			this.$http({
				//ES6语法，引入组件内的 route object（路由信息对象）
				url: `https://cnodejs.org/api/v1/user/${
					this.$route.params.name
				}`,
				method: 'get'
			})
				.then(response => {
					if (response.data.success === true) {
						this.userinfo = response.data.data
					}
				})
				.catch(function(error) {
					console.log(error)
				})
		}
	},

	beforeMount() {
		this.getData()
	}
}
</script>

<style>
.userInfomation {
	background-color: white;
	width: 70%;
	margin: 10px auto;
}
.userInfomation section {
	padding: 12px;
}
.userInfomation img {
	width: 5rem;
}
.userInfomation .replies {
	font-size: 0.72rem;
	border: 1px solid #cccccc;
}
.userInfomation > div > p {
	padding: 12px 0 12px 12px;
	background-color: rgba(212, 205, 205, 0.17);
	font-size: 0.75rem;
}
.userInfomation > div > ul > li {
	padding: 4px 0 4px 12px;
	white-space: nowrap;
	font-size: 0.72rem;
	text-overflow: ellipsis;
	overflow: hidden;
	line-height: 30px;
	vertical-align: middle;
}
.userInfomation > div > ul > li > a {
	color: #094e99;
	text-decoration: none;
}
</style>
