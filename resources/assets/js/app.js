
new Vue({
	el: '#crud',
	created: function(){
		this.getKeeps();
	},
	data: {
		keeps: []
	},
	methods: {
		getKeeps: function(){
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response =>{
				this.keeps = response.data
			});
		},
		deleteKeep: function(keep){
			var url = 'tasks/' + keep.id;
			axios.delete(url).then(response => {//Eliminamos
				this.getKeeps();//Listamos
				toastr.success('Eliminado correctamente');//Mandamos mensaje
			});

		}
	}
});