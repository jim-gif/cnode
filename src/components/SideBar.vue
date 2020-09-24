<template>
	<div class="SideBar">
		<div class="autherinfo">
			<div class="authersummay">
				<p>作者</p>
				<router-link :to="{name: 'user_info', params:{name: userinfo.loginname }}">
					<img :src="userinfo.avatar_url">
				</router-link>
				<router-link
					:to="{name: 'user_info', params: {name: userinfo.loginname}}"
					:title="userinfo.loginname"
				>{{userinfo.loginname}}</router-link>
				<section>积分：{{userinfo.score}}</section>
			</div>
			<div class="recent_topics">
				<p>作者最近主题</p>
				<ul>
					<li v-for="list in topicsLimitby5">
						<router-link
							:to="{name: 'post_content',params: {id: list.id, name:list.author.loginname}}"
						>{{list.title}}</router-link>
					</li>
				</ul>
			</div>
			<div class="recent_replies">
				<p>作者最近回复</p>
				<ul>
					<li v-for="list in userinfo.recent_replies">
						<router-link
							:to="{name: 'post_content',params: {id: list.id, name:list.author.loginname}}"
						>{{list.title}}</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SideBar',
	data() {
		return {
			userinfo: null
		}
	},

	methods: {
		getData() {
			this.$http({
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
	},

	computed: {
		topicsLimitby5() {
			return this.userinfo.recent_topics.slice(0, 5)
		}
	},

	//监控同级路由下复用附件，进行数据更新
	watch: {
		$route() {
			this.getData()
		}
	}
}
</script>

<style scoped>
.SideBar {
	width: 24%;
	float: right;
	box-sizing: border-box;
	margin-right: 3%;
	padding: 0.8rem 0.4rem;
}
.SideBar .autherinfo {
	background-color: white;
}
.SideBar > div p {
	font-size: 0.75rem;
	padding: 12px 0 12px 12px;
	background-color: rgba(212, 205, 205, 0.17);
}
.SideBar .authersummay a {
	display: inline-block;
	vertical-align: top;
	padding: 12px 0 0 6px;
}
.SideBar .authersummay a[title] {
	margin-top: 20px;
	margin-left: 2px;
}
.SideBar img {
	width: 3.5rem;
	display: inline-block;
	padding: 0 0 0 6px;
	border-radius: 3px;
}
.SideBar a {
	text-decoration: none;
	color: #a8a3a3;
}
.SideBar section {
	padding: 12px 0 12px 12px;
	font-size: 0.75rem;
}
.recent_topics,
.recent_replies {
	background-color: white;
	border-top: 10px solid #cccccc;
}
.recent_topics li,
.recent_replies li {
	padding: 4px 0 0 12px;
	color: #c0ccda;
	white-space: nowrap;
	font-size: 0.72rem;
}
.recent_topics ul,
.recent_replies ul {
	padding: 10px 0 10px 0;
}
.recent_topics li a,
.recent_replies li a {
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 95%;
	display: inline-block;
}
</style>
