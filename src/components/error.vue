<template>
	<p>There has been an error</p>
</template>

<script setup>
const props = defineProps(['message'])

console.log(props.message)
</script>
