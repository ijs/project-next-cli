export default function askCreator({template, user, email}) {
	return [
		{
			type: 'confirm',
			name: 'private',
			message: 'Is the project private ?'
		},
		{
			type: 'input',
			name: 'name',
			message: 'package name',
			default: template,
			validate(input) {
				const done = this.async()
				if(input.trim().length == 0) {
					done('project name is empty')
					return
				}
				done(null, true)
			}
		},
		
		{
			type: 'input',
			name: 'description',
			message: 'description'
		},
		
		{
			type: 'list',
			name: 'license',
			message: 'license',
			choices: ["MIT", "BSD 2-clause 'Simplified'", "Apache 2.0", "GNU General Public v3.0", "BSD 3-clause", "Eclipse Public 1.0", "GNU Affero General Public v3.0", "GNU General Public v2.0", "GNU Lesser General Public v2.1", "GNU Lesser General Public v3.0", "Mozilla Public 2.0", "The Unlicense"],
		},
		{
			type: 'input',
			name: 'author',
			message: 'author',
			default: email
		},
		{
			type: 'input',
			name: 'git',
			message: 'user/repo',
			default: `${user}/${template}`,
			validate(input) {
				const done = this.async()
				if(!/\w+\/\w+/.test(input)) {
					done('Please input like user/repo')
					return
				}
				done(null, true)
			}
		}
	]
}