// let highlight = (text, search) => {
// 	let highlighted = '<span v-bind:style=\'style\'>' + search + '</span>'
// 	return text.replace(search, highlighted)
// }

let app = new Vue({
	el: '#app',

	data: {
		appName: 'Chuck Norris Facts',
		fact: '',
		search_fact: '',
		categories: [],
		selected: '',
		history: [],
		search: '',
		search_return: [],
		style: {
			background: 'yellow',
		},
	},

	methods: {
		getFact() {
			axios.get('https://api.chucknorris.io/jokes/random', {
				headers: {
					Accept: 'application/json'
				}
			})
			.then(response => {
				console.log(response)
				if (this.fact) {
					this.history.push(this.fact)
				}
				this.fact = response.data.value
				this.search_return = []
				// to show that it works
				console.log(this.fact)
			})
			.catch(err => {
				alert(err)
			})
		},
		getCategories() {
			axios.get('https://api.chucknorris.io/jokes/categories', {
				headers: {
					Accept: 'application/json'
				}
			})
			.then(response =>  {
				// return this.categories = response.data
				if (this.categories.length == 0) {
					response.data.forEach(item => {
						this.categories.push({type: 'category', value: item})
					})
				}
			})
		},
		searching() {
			axios.get('https://api.chucknorris.io/jokes/search?query=' + this.search, {
				headers: {
					Accept: 'application/json'
				}
			}).then(response => {
				console.log(response)
				this.search_return = []
				response.data.result.forEach(item => {
					this.search_return.push({key: 'fact', value: item.value})
				})
				// this.search_fact = response.data.result
				this.fact = ''
				this.history = []
			})
		},
		categorySearch() {
			axios.get('https://api.chucknorris.io/jokes/random?category=' + this.selected, {
				headers: {
					Accept: 'application/json'
				}
			}).then(response => {
				console.log(response)
				if (this.fact) {
					this.history.push(this.fact)
				}
				this.fact = response.data.value
				this.search_return = []
				console.log(this.fact)
			})
		},
		highlight(text) {
			let highlighted = '<span class="highlight" v-bind:style="style">' + this.search + '</span>'
			return text.replace(new RegExp(this.search, 'gi'), highlighted)
		}
	},

	// called right before th4e mounting begins: the `render` function
	// is about to be called for the first time
	beforeMount() {
		this.getCategories()
	},
	//
	// filters: {
	// 	highlight: highlight
	// }
})
