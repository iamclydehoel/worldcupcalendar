import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
	install: (app, options) => {
		app.directive('scroll-lock', {
			mounted(el, binding) {
				if (binding.value) {
					disableBodyScroll(el)
				}
			},

			updated(el, binding) {
				if (binding.value) {
					disableBodyScroll(el)
				} else {
					enableBodyScroll(el)
				}
			},

			unmounted(el) {
				enableBodyScroll(el)
			},
		})
	},
}
