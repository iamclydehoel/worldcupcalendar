<template>
	<div class="grid gap-4">
		<loading v-if="loading" />
		<error v-else-if="error" :message="error" />
		<template v-else>
			<template v-for="(group, groupIndex) in groups">
				<div class="flex" :class="groupIndex !== 0 ? 'mt-4' : null">
					<div class="flex-1">
						<span class="text-tertiary/40">{{ group.name }}</span>
					</div>
					<div class="w-7.5 sm:w-10 text-center">
						<span class="text-tertiary/30">P</span>
					</div>
					<div class="w-7.5 sm:w-10 text-center">
						<span class="text-tertiary/30">W</span>
					</div>
					<div class="w-7.5 sm:w-10 text-center">
						<span class="text-tertiary/30">D</span>
					</div>
					<div class="w-7.5 sm:w-10 text-center">
						<span class="text-tertiary/30">L</span>
					</div>
					<div class="hidden sm:block sm:w-10 text-center">
						<span class="text-tertiary/30">F</span>
					</div>
					<div class="hidden sm:block sm:w-10 text-center">
						<span class="text-tertiary/30">A</span>
					</div>
					<div class="w-7.5 sm:w-10 text-center">
						<span class="text-tertiary/30">GD</span>
					</div>
					<div class="w-7.5 sm:w-10 text-center">
						<span class="text-tertiary/30 tracking-wide">Pts</span>
					</div>
				</div>

				<template v-for="team in group.table">
					<div class="flex" :class="team.name.toLowerCase() == store.team ? 'text-primary' : ''">
						<div class="flex-1">
							<button @click="toggleTeam(team)">{{ team.name }}</button>
						</div>
						<div class="w-7.5 sm:w-10 text-center">
							<span>{{ team.played }}</span>
						</div>
						<div class="w-7.5 sm:w-10 text-center">
							<span>{{ team.won }}</span>
						</div>
						<div class="w-7.5 sm:w-10 text-center">
							<span>{{ team.draw }}</span>
						</div>
						<div class="w-7.5 sm:w-10 text-center">
							<span>{{ team.lost }}</span>
						</div>
						<div class="hidden sm:block sm:w-10 text-center">
							<span>{{ team.goalsFor }}</span>
						</div>
						<div class="hidden sm:block sm:w-10 text-center">
							<span>{{ team.goalsAgainst }}</span>
						</div>
						<div class="w-7.5 sm:w-10 text-center">
							<span>{{ team.goalDifference }}</span>
						</div>
						<div class="w-7.5 sm:w-10 text-center">
							<span>{{ team.points }}</span>
						</div>
					</div>
				</template>
			</template>
		</template>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTeamStore } from '@/stores/team'

import formatGroups from '@/assets/scripts/groups/format'
import Loading from '@/components/loading.vue'
import Error from '@/components/error.vue'

const loading = ref(null)
const error = ref(null)

const store = useTeamStore()

const toggleTeam = (team) => {
	if (store.team == team.name.toLowerCase()) {
		store.team = null
	} else {
		store.team = team.name.toLowerCase()
	}
}

const groups = ref([])

const getGroups = async () => {
	loading.value = true

	try {
		const response = await fetch('/api/groups')
		const data = await response.json()

		groups.value = formatGroups(data.standings)
	} catch (e) {
		error.value = e
	} finally {
		setTimeout(() => {
			loading.value = false
		}, 800)
	}
}

onMounted(() => {
	getGroups()
})
</script>
