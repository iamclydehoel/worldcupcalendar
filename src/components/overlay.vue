<template>
	<div class="fixed inset-0 p-8 bg-secondary text-tertiary overflow-scroll overscroll-none">
		<div class="flex justify-between mb-12">
			<h2>World Cup Calendar</h2>

			<button @click="$emit('close')">Close</button>
		</div>

		<slot />
	</div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

const closeOnEscape = (e) => {
	if (e.key === 'Escape') {
		emit('close')
	}
}

onMounted(() => {
	document.body.addEventListener('keyup', (e) => {
		closeOnEscape(e)
	})
})

onUnmounted(() => {
	document.body.removeEventListener('keyup', (e) => {
		closeOnEscape(e)
	})
})
</script>
