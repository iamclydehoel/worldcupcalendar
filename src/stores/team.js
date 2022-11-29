import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useTeamStore = defineStore('team', {
	state: () => ({
		team: useLocalStorage('team', null),
	}),
})
