<template>
	<div class="ArticleSection">
		<!-- 内容区 -->
		<div class="actrcie">
			<h3 class="titles">{{post.title}}</h3>
			<ul>
				<li>• 分类:{{postTab}}</li>
				<li>• {{post.visit_count}}</li>
				<li>• 发布于: {{post.create_at | formatDate}}</li>
				<li>
					• 作者:
					<router-link
						:to="{name: 'user_info',params:{name:post.author.loginname}}"
					>{{post.author.loginname}}</router-link>
				</li>
			</ul>
			<div v-html="post.content" id="content"></div>
		</div>
		<!-- 讨论区 -->
		<div class="reqly">
			<div v-for="(reply, index) in post.replies" class="replySec">
				<div class="replyUp">
					<!-- <router-link :to="{name: "user_info", params:{name: reply.author.loginname}}"> -->
					<img :src="reply.author.avatar_url">
					<!-- </router-link> -->
					<!-- <router-link
						:to="{name: "user_info", params:{name: reply.author.loginname}}"
					>{{reply.author.loginname}}</router-link>-->
					<span class="tower">{{index + 1}}楼</span>
				</div>
				<div class="like" v-if="reply.ups.length > 0">
					<span>♥</span>
					{{reply.ups.length}}
				</div>
				<p v-html="reply.content">顶起</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Article',
	data() {
		return {
			post: {
				author: {
					loginname: 'temp' //设置默认值，防止Vue在axios未被调用前报错
				}
			}
		}
	},

	computed: {
		postTab() {
			var type = this.post.tab.toString()
			if ((type = 'ask')) {
				return '问答'
			}
			if ((type = 'share')) {
				return '分享'
			}
			if ((type = 'job')) {
				return '招聘'
			}
			if ((type = 'good')) {
				return '精华'
			}
		}
	},

	methods: {
		getData() {
			this.$http({
				//ES6语法，引入组件内的 route object（路由信息对象）
				url: `https://cnodejs.org/api/v1/topic/${
					this.$route.params.id
				}`,
				method: 'get',
				params: {
					mdrender: true
				}
			})
				.then(response => {
					if (response.data.success === true) {
						this.post = response.data.data
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

	watch: {
		$route() {
			this.getData()
		}
	}
}
</script>

<style>
/*scoped属性导致css仅对当前组件生效，而html绑定渲染出的内容可以理解为是子组件的内容，子组件不会被加上对应的属性，所以不会应用css.
解决的话把scoped属性去掉就行了*/
@import url('../assets/markdown-github.css');
.ArticleSection {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	display: inline-block;
	width: 70%;
	border: 1px solid #ddd;
	padding: 0.8rem 0.4rem;
	margin-left: 3%;
}
.ArticleSection #content {
	padding: 2rem 1rem 2rem 1rem;
	line-height: 1.6;
	padding-bottom: 1rem;
}
.actrcie {
	background-color: #ffffff;
	margin-bottom: 10px;
	padding-left: 20px;
	padding-top: 10px;
}
.actrcie .titles {
	font-size: 1.2rem;
	font-weight: 600;
}

.actrcie ul > li {
	display: inline-block;
	font-size: 0.8rem;
	color: #a8a3a3;
	padding-left: 10px;
}
.reqly {
	display: flex;
	flex-direction: column;
}
.reqly .replySec {
	width: 100%;
	background-color: white;
	border-bottom: 1px solid #cccccc;
	padding: 1rem;
}
.reqly .replySec .replyUp {
	display: inline-block;
}
.reqly .replySec .replyUp img {
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 1rem;
}
.reqly .replySec .replyUp span {
	font-size: 18px;
	font-weight: bold;
}
.reqly .replySec .replyUp .tower {
	color: #806767;
	font-size: 14px;
	margin-left: 6px;
	margin-top: 7px;
}
.reqly .replySec .like {
	color: red;
	float: right;
}
.reqly .replySec p {
	padding-left: 50px;
	clear: both;
}
</style>

