
new Vue({
	el: '#crud',
	created: function(){
		this.getKeeps();
	},
	data: {
		keeps: [],
		newKeep: '',
		fillKeep: { 'id': '', 'keep': '' },
		errors: []
	},
	methods: {
		getKeeps: function(){
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response =>{
				this.keeps = response.data
			});
		},
		editKeep: function(keep){
			this.fillKeep.id = keep.id;
			this.fillKeep.keep = keep.keep;
			$('#edit').modal('show');
		},
		updateKeep: function(id){
			var url = 'tasks/' + id;
			axios.put(url, this.fillKeep).then(response => {
				this.getKeeps();
				this.fillKeep = {'id': '', 'keep': ''};
				this.errors = [];
				$('#edit').modal('hide');
				toastr.success('Tarea actualizada correctamente');
			}).catch(error => {
				this.errors = error.response.data
			});
		},
		deleteKeep: function(keep){
			var url = 'tasks/' + keep.id;
			axios.delete(url).then(response => {//Eliminamos
				this.getKeeps();//Listamos
				toastr.warning('Eliminado correctamente');//Mandamos mensaje
			});

		},
		createKeep: function(){
			var url = 'tasks';
			axios.post(url, {
				keep: this.newKeep
			}).then(response => {
				this.getKeeps();
				this.newKeep = '';
				this.errors = [];
				$('#create').modal('hide');
				toastr.info('Nueva tarea creada con exito');
			}).catch(error => {
				this.errors = error.response.data
			});
		},


	}
});
