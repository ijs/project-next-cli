import ora from 'ora'

export default function loading(action = 'getting', repo = ''){
	const l =  ora(`${action} ${repo}`)
	return l.start()
}
