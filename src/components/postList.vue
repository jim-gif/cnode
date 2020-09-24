<template>
	<div class="PostList">
		<div class="posts">
			<ul class="center">
				<li class="list" v-for="post in posts">
					<router-link
						class="head"
						:to="{name: 'user-info', params:{name: post.author.loginname}}"
						:title="post.author_id"
					>
						<img :src="post.author.avatar_url" :title="post.author.loginname">
					</router-link>
					<span class="date">{{post.reply_count}}/{{post.visit_count}}</span>
					<router-link
						class="colmun"
						:to="{name: 'post_content', params: {id: post.id, name: post.author.loginname}}"
						:title="post.author_id"
					>{{post.title}}</router-link>
					<span class="sky">{{ post.last_reply_at | formatDate}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PostList',
	data() {
		return {
			posts: {}
		}
	},
	filters: {
		//消息创建时间CreateTime，它表示1970年1月1日0时0分0秒至消息创建时所间隔的秒数
		tiemStyle(createTime) {
			///.{10}/匹配任意一个字符10次
			//将createTime转化为字符串并匹配正则表达式
			return String(createTime).match(/.{10}/)[0]
		}
	},
	methods: {
		getData() {
			//为getDatas创建请求
			this.$http({
				//请求路径
				url: 'https://cnodejs.org/api/v1/topics',
				//请求方式
				method: 'get',
				//即将与请求一起发送的 URL 参数，表示一页20行
				params: {
					page: 1,
					limit: 20
				}
			})
				.then(response => {
					//响应成功时返回数据
					if (response.data.success == true) {
						this.posts = response.data.data
					}
				})
				//失败时返回错误
				.catch(function(error) {
					console.log(error)
				})
		}
	},
	beforeMount() {
		this.getData()
		console.log(123)
	}
}
</script>

<style scoped>
.posts {
	background-color: white;
	padding: 0.5rem;
	margin: 0.5rem 3rem;
}

.posts ul .list {
	list-style: none;
	line-height: 30px;
	border-bottom: 1px solid #e7e7e7;
	margin-bottom: 14px;
}
.posts ul .list .head {
	text-decoration: none;
	display: inline-block;
	white-space: nowrap;
	vertical-align: middle;
	max-height: 70%;
	overflow: hidden;
	text-overflow: ellipsis;
}
.posts ul .list .head img {
	width: 1.5rem;
	height: 1.5rem;
}
.posts ul .list .date {
	display: inline-block;
	text-align: center;
	width: 70px;
	font-size: 12px;
	margin: 0 10px;
}
.posts ul .list .colmun {
	text-decoration: none;
	white-space: nowrap;
	display: inline-block;
	vertical-align: middle;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 70%;
	color: #858585;
}
.posts ul .list .sky {
	float: right;
	font-size: 0.7rem;
	margin-top: 0.3rem;
}
</style>

