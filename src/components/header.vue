<template>
	<div class="title">
		<div class="icon">
			<img src="../assets/icon.png" alt>
		</div>
		<div class="msg">
			<p>关于</p>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style>
body {
	margin: 0;
	padding: 0;
}
.title {
	width: 100%;
	height: 50px;
	background-color: rgb(90, 85, 85);
	display: flex;
	justify-content: space-between;
	position: relative;
}
.icon {
	display: flex;
	align-items: center;
	justify-content: center;
}
.msg {
	display: flex;
	align-items: center;
	justify-content: center;
}
.msg p {
	color: rgb(189, 187, 187);
	font-size: 18px;
	padding-right: 50px;
}
</style>
