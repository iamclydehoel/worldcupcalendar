export default function formatGroups(groups) {
	let formattedGroups = []

	groups.forEach((item) => {
		let group = {
			name: `Group ${item.group.slice(-1)}`,
			table: [],
		}

		item.table.forEach((item) => {
			let table = {
				position: item.position,
				name: item.team.name,
				played: item.playedGames,
				form: item.form,
				won: item.won,
				draw: item.draw,
				lost: item.lost,
				goalsFor: item.goalsFor,
				goalsAgainst: item.goalsAgainst,
				goalDifference: item.goalDifference,
				points: item.points,
			}

			group.table.push(table)
		})

		formattedGroups.push(group)
	})

	return formattedGroups
}
