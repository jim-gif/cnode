<template>
	<div id="app">
		<c-Header></c-Header>
		<router-view name="main"></router-view>
		<router-view name="sideBar"></router-view>
	</div>
</template>

<script>
import cHeader from '@/components/header'
export default {
	name: 'App',
	components: {
		cHeader
	}
}
</script>

<style>
html {
	background-color: #dddddd;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 20px;
}
body,
div,
span,
a,
p,
ul,
li {
	margin: 0;
	padding: 0;
}
</style>
