export default function sortMatches(matches) {
	let sortedMatches = matches.reduce((sortedMatches, match) => {
		const date = new Date(match.utcDate).toDateString()

		if (!sortedMatches[date]) {
			sortedMatches[date] = []
		}

		sortedMatches[date].push(match)

		return sortedMatches
	}, {})

	sortedMatches = Object.keys(sortedMatches).map((date) => {
		return {
			date,
			matches: sortedMatches[date],
		}
	})

	return sortedMatches
}
