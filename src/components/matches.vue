<template>
	<div class="grid gap-4">
		<loading v-if="loading" />
		<error v-else-if="error" :message="error" />
		<template v-else>
			<template v-for="(day, dayIndex) in calendar" :key="day.date">
				<template v-for="(match, matchIndex) in day.matches" :key="match.id">
					<div
						class="flex"
						:class="matchIndex == 0 && dayIndex !== 0 ? 'mt-4' : null"
						:date="match.date"
					>
						<div class="w-24 sm:w-20">
							<span v-if="matchIndex == 0" class="text-secondary/50">
								{{ match.weekday }} — {{ match.day }}
							</span>
						</div>

						<div
							v-if="match.home.team"
							class="flex-1 gap-y-4 gap-x-1.5 flex flex-wrap order-3 sm:order-2"
							:class="
								match.home.team.toLowerCase() == store.team ||
								match.away.team.toLowerCase() == store.team
									? 'text-primary'
									: ''
							"
						>
							<div class="min-w-1/2 flex-1 sm:min-w-0 sm:text-right">
								<span>
									{{ match.home.team }}
								</span>
							</div>

							<template v-if="match.status !== 'TIMED'">
								<span class="inline-flex items-baseline sm:w-8 sm:justify-end gap-0.5">
									<small v-if="match.home.penalties || match.away.penalties" class="tracking-wider">
										({{ match.home.penalties || '0' }})
									</small>

									{{ match.home.goals }}
								</span>

								<span
									class="hidden sm:block sm:w-1 sm:text-center"
									:class="match.status == 'IN_PLAY' ? 'animate-flash' : null"
								>
									:
								</span>

								<span class="inline-flex items-baseline order-4 sm:order-3 sm:w-8 gap-0.5">
									<small
										v-if="match.away.penalties || match.home.penalties"
										class="tracking-wider sm:order-last"
									>
										({{ match.away.penalties || '0' }})
									</small>

									{{ match.away.goals }}
								</span>
							</template>

							<template v-else>
								<span class="hidden sm:block sm:text-center sm:w-20">vs</span>
							</template>

							<div class="min-w-1/2 sm:min-w-0 flex-1 order-3 sm:order-4">
								<span>
									{{ match.away.team }}
								</span>
							</div>
						</div>

						<div v-else class="flex-1 sm:text-center order-3 sm:order-2">
							<span>{{ match.stage }}</span>
						</div>

						<div class="w-16 sm:w-20 sm:text-right order-2 sm:order-3">
							<span class="text-secondary/50">{{ match.hour }}:{{ match.minutes }}</span>
						</div>
					</div>
				</template>
			</template>
		</template>
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useTeamStore } from '@/stores/team'

import formatMatches from '@/assets/scripts/matches/format'
import sortMatches from '@/assets/scripts/matches/sort'
import inViewport from '@/assets/scripts/utilities/inViewport'
import Loading from '@/components/loading.vue'
import Error from '@/components/error.vue'

const loading = ref(true)
const error = ref(null)

const store = useTeamStore()

const calendar = ref([])

const getMatches = async () => {
	try {
		const response = await fetch('/api/matches')
		const data = await response.json()

		calendar.value = formatMatches(data.matches)
		calendar.value = sortMatches(calendar.value)
	} catch (e) {
		error.value = e
	} finally {
		setTimeout(() => {
			loading.value = false
		}, 800)
	}
}

onMounted(() => {
	getMatches()

	setInterval(() => {
		getMatches()
	}, 60000)
})

const today = new Date().toDateString()

watch(loading, async (isLoading) => {
	if (!isLoading) {
		setTimeout(() => {
			const el = document.querySelector(`[date="${today}"]`)

			if (!inViewport(el)) {
				el.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
			}
		}, 800)
	}
})
</script>
