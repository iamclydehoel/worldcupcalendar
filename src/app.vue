<template>
	<div class="p-8">
		<site-header @open="open" />

		<overlay v-show="isOpen" v-scroll-lock="isOpen" id="overlay" @close="close">
			<groups />
		</overlay>

		<matches />
	</div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useTeamStore } from './stores/team'
import SiteHeader from './components/site-header.vue'
import Overlay from './components/overlay.vue'
import Matches from './components/matches.vue'
import Groups from './components/groups.vue'

const store = useTeamStore()

const setTeam = () => {
	document.body.setAttribute('data-team', store.team)
}

store.$subscribe((mutation, state) => {
	setTeam()
})

onBeforeMount(() => {
	if (window.location.hash) {
		store.team = window.location.hash.replace('#', '')
	}
})

onMounted(() => {
	setTeam()

	setTimeout(() => {
		history.replaceState({}, document.title, window.location.pathname)
	}, 100)
})

let isOpen = ref(false)

const open = () => {
	isOpen.value = true

	window.scrollTo(0, 0)
}

const close = () => {
	isOpen.value = false

	document.getElementById('overlay').scrollTo(0, 0)
}
</script>
