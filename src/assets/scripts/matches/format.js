export default function formatMatches(matches) {
	let formattedMatches = []

	matches.forEach((item) => {
		const datetime = new Date(item.utcDate)

		let match = {
			id: item.id,
			utcDate: item.utcDate,
			date: datetime.toDateString(),
			weekday: datetime.toLocaleDateString('en-GB', { weekday: 'short' }),
			day: datetime.getDate(),
			hour: datetime.getHours(),
			minutes: ('0' + datetime.getMinutes()).slice(-2),
			status: item.status,
			stage: formatStage(item.stage),
			home: {
				id: item.homeTeam.id,
				team: formatTeam(item.homeTeam.name),
				goals: item.score.penalties?.home
					? item.score.fullTime.home - item.score.penalties.home
					: item.score.fullTime.home,
				penalties: item.score.penalties?.home || null,
			},
			away: {
				id: item.awayTeam.id,
				team: formatTeam(item.awayTeam.name),
				goals: item.score.penalties?.away
					? item.score.fullTime.away - item.score.penalties.away
					: item.score.fullTime.away,
				penalties: item.score.penalties?.away || null,
			},
		}

		formattedMatches.push(match)
	})

	return formattedMatches
}

const formatStage = (stage) => {
	if (stage == 'LAST_16') {
		return 'Last 16'
	} else if (stage == 'QUARTER_FINALS') {
		return 'Quarter-final'
	} else if (stage == 'SEMI_FINALS') {
		return 'Semi-final'
	} else if (stage == 'THIRD_PLACE') {
		return 'Third place'
	} else if (stage == 'FINAL') {
		return 'Final'
	} else {
		return stage
	}
}

const formatTeam = (team) => {
	if (team == 'North Macedonia') {
		return 'Macedonia'
	} else if (team == 'Czech Republic') {
		return 'Czechia'
	} else {
		return team
	}
}
