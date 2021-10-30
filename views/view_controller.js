/*jshint esversion: 6 */
$(function() {

//Estudiant View Controller:
function StudentVC(ajaxUrl, name = "Student", id = "#students") {
  this.name = name;
  this.id = id;
  this.url = ajaxUrl;

  // VIEWs
  StudentVC.prototype.studentList = function(students) {
    

    return `<h1 class="center">${this.name} list</h1>
    <div class="topnav">
    <a><button class="new">Afegir estudiant</button></a>
    <a><input type="text" id="myInput" onkeyup="filtreNomEstudiant()" placeholder="Buscar per nom.." title="Escriviu un nom"></a>
    </div>
    <table id="estudiants" class="table">
    <tr>
      <th>Nom</th>
      <th>Domicili</th>
      <th>Poblacio</th>
      <th>Carrera</th>
      <th>Tipus estudi</th>
      <th>Eliminar/Editar</th>
    </tr>
    ` +
    students.reduce(
      (ac, student) => ac += 
      `<tr>
        <td>${student.nom}</td>
        <td>${student.vivenda}</td>
        <td>${student.poblacio}</td>
        <td>${student.carrera}</td>
        <td>${student.tipus_estudi}</td>
        <td><button type="submit" class="delete" studentid="${student.id}" title="Delete"> <img src="public/icon_delete.png"/> </button>
            <button type="button" class="edit"   studentid="${student.id}" title="Edit"  > <img src="public/icon_edit.png"/> </button>
        </td>
      </tr>\n`, 
      "");
  };

  StudentVC.prototype.studentForm = function(msg, id, action, nom, vivenda, poblacio, carrera, tipus_estudi) {
    return `<h1>${this.name} form</h1>
    ${msg}: <p class="form">
    <input type="text" name="nom"  value="${nom}" placeholder="nom"/>
    <input type="text" name="vivenda"  value="${vivenda}" placeholder="vivenda"/>
    <input type="text" name="poblacio"  value="${poblacio}" placeholder="poblacio"/>
    <input type="text" name="carrera"  value="${carrera}" placeholder="carrera"/>
    <input type="text" name="tipus_estudi"  value="${tipus_estudi}" placeholder="tipus_estudi"/>
    <button type="submit" class="${action}" studentid="${id}">${action}</button>
    </p>
    <button class="list">Go back</button>
    `;
  };


  // CONTROLLERs

  StudentVC.prototype.listController = function() {
    let p1 = $.ajax({
      dataType: "json",
      method: "GET",
      url: this.url + '/list/'
    });
    Promise.all([p1])
    .then(([r1]) => {
      let students = r1;
      $(this.id).html(this.studentList(students));
    })
    .catch(error => {console.error(error.status, error.responseText);});
  };

  StudentVC.prototype.newController = function() {
    $(this.id).html(this.studentForm('Afegir estudiant', null, 'create', '', '','', '',''));
    $(this.id+' input[name=nom]').focus();
    $(this.id+' input[name=vivenda]').focus();
    $(this.id+' input[name=poblacio]').focus();
    $(this.id+' input[name=carrera]').focus();
    $(this.id+' input[name=tipus_estudi]').focus();
  };

  StudentVC.prototype.editController = function(id) {
    $.ajax({
      dataType: "json",
      method: "GET",
      url: this.url + '/find/id/' + id
    })
    .then(r => {
      let student = r;
      $(this.id).html(this.studentForm('Edit student', id, 'update', student[0].nom, student[0].vivenda, student[0].poblacio, student[0].carrera, student[0].tipus_estudi));
      $(this.id+' input[name=nom]').focus();
      $(this.id+' input[name=vivenda]').focus();
      $(this.id+' input[name=poblacio]').focus();
      $(this.id+' input[name=carrera]').focus();
      $(this.id+' input[name=tipus_estudi]').focus();
      })
    .catch(error => {console.error(error.status, error.responseText);});
  };

  StudentVC.prototype.createController = function() {
    $.ajax({
      dataType: "json",
      method: "POST",
      url: this.url+ '/create',
      data: {
        nom: $(this.id+' input[name=nom]').val(),
        vivenda: $(this.id+' input[name=vivenda]').val(),
        poblacio: $(this.id+' input[name=poblacio]').val(),
        carrera: $(this.id+' input[name=carrera]').val(),
        tipus_estudi: $(this.id+' input[name=tipus_estudi]').val() 
      }
    })
    .then(() => {this.listController();})
    .catch(error => {console.error(error.status, error.responseText);});

  };

  StudentVC.prototype.updateController = function(id) {
    $.ajax({
      dataType: "json",
      method: "PUT",
      url: this.url + '/' + 'update/id/'+ id,
      data: {
        nom: $(this.id+' input[name=nom]').val(),
        vivenda: $(this.id+' input[name=vivenda]').val(),
        poblacio: $(this.id+' input[name=poblacio]').val(),
        carrera: $(this.id+' input[name=carrera]').val(),
        tipus_estudi: $(this.id+' input[name=tipus_estudi]').val()
      }
    })
    .then(() => {this.listController();})
    .catch(error => {console.error(error.status, error.responseText);});

  };
  
  StudentVC.prototype.deleteController = function(id) {
    $.ajax({
      dataType: "json",
      method: "DELETE",
      url: this.url + '/' +'destroy/id/'+ id,
      data: {
        nom: $(this.id+' input[name=nom]').val(),
        vivenda: $(this.id+' input[name=vivenda]').val(),
        poblacio: $(this.id+' input[name=poblacio]').val(),
        carrera: $(this.id+' input[name=carrera]').val(),
        tipus_estudi: $(this.id+' input[name=tipus_estudi]').val()
      }
    })
    .then(() => {this.listController();})
    .catch(error => {console.error(error.status, error.responseText);});

  };

  // ROUTER
  StudentVC.prototype.eventsController = function() {
    $(document).on('click', this.id+' .list',   () => this.listController());
    $(document).on('click', this.id+' .new',    () => this.newController());
    $(document).on('click', this.id+' .edit',   (e)=> this.editController(Number($(e.currentTarget).attr('studentid'))));
    $(document).on('click', this.id+' .create', () => this.createController());
    $(document).on('click', this.id+' .update', (e)=> this.updateController(Number($(e.currentTarget).attr('studentid'))));
    $(document).on('click', this.id+' .delete', (e)=> this.deleteController(Number($(e.currentTarget).attr('studentid'))));
    $(document).on('keypress', this.id+' .form',(e) => {if (e.keyCode === 13) $(this.id+ " button[type=submit]").trigger("click");});
  };

  this.listController();
  this.eventsController();
}

//Facultat View Controller:
function FacultatVC(ajaxUrl, name = "Facultat", id = "#faculties") {
  this.name = name;
  this.id = id;
  this.url = ajaxUrl;

   // VIEWs
  FacultatVC.prototype.facultatList = function(facultats) {
    return `<h1 class="center">${this.name} list</h1>
    <div class="topnav">
    <a><button class="new">Afegir facultat</button></a>
    <a><input type="text" id="myInput2" onkeyup="filtreNomFacultat()" placeholder="Buscar per nom.." title="Escriviu un nom"></a>
    </div>
    <table id="facultats" class="table">
    <tr>
      <th>Nom</th>
      <th>Direcció</th>
      <th>Universitat</th>
      <th>Eliminar/Editar</th>
    </tr>
    ` +
    facultats.reduce(
      (ac, facultat) => ac += 
      `<tr>
        <td>${facultat.nom}</td>
        <td>${facultat.direccio}</td>
        <td>${facultat.universitat}</td>
        <td><button type="submit" class="delete" facultatid="${facultat.id}" title="Delete"> <img src="public/icon_delete.png"/> </button>
            <button type="button" class="edit"   facultatid="${facultat.id}" title="Edit"  > <img src="public/icon_edit.png"/> </button>
        </td>
      </tr>\n`, 
      "");
  };

  FacultatVC.prototype.facultatForm = function(msg, id, action, nom, direccio, universitat) {
    return `<h1>${this.name} form</h1>
    ${msg}: <p class="form">
    <input type="text" name="nom"  value="${nom}" placeholder="nom"/>
    <input type="text" name="direccio"  value="${direccio}" placeholder="direccio"/>
    <input type="text" name="universitat"  value="${universitat}" placeholder="universitat"/>
    <button type="submit" class="${action}" facultatid="${id}">${action}</button>
    </p>
    <button class="list">Go back</button>
    `;
  };


  // CONTROLLERs

  FacultatVC.prototype.listController = function() {
    let p1 = $.ajax({
      dataType: "json",
      method: "GET",
      url: this.url + '/list/'
    });
    Promise.all([p1])
    .then(([r1]) => {
      let facultats = r1;
      $(this.id).html(this.facultatList(facultats));
    })
    .catch(error => {console.error(error.status, error.responseText);});
  };

  FacultatVC.prototype.newController = function() {
    $(this.id).html(this.facultatForm('Afegir facultat', null, 'create', '', '',''));
    $(this.id+' input[name=nom]').focus();
    $(this.id+' input[name=direccio]').focus();
    $(this.id+' input[name=universitat]').focus();
  };

  FacultatVC.prototype.editController = function(id) {
    $.ajax({
      dataType: "json",
      method: "GET",
      url: this.url + '/find/id/' + id
    })
    .then(r => {
      let facultat = r;
      $(this.id).html(this.facultatForm('Edit facultat', id, 'update', facultat[0].nom, facultat[0].direccio, facultat[0].universitat));
      $(this.id+' input[name=nom]').focus();
      $(this.id+' input[name=direccio]').focus();
      $(this.id+' input[name=universitat]').focus();
      })
    .catch(error => {console.error(error.status, error.responseText);});
  };

  FacultatVC.prototype.createController = function() {
    $.ajax({
      dataType: "json",
      method: "POST",
      url: this.url+ '/create',
      data: {
        nom: $(this.id+' input[name=nom]').val(),
        direccio: $(this.id+' input[name=direccio]').val(),
        universitat: $(this.id+' input[name=universitat]').val()
      }
    })
    .then(() => {this.listController();})
    .catch(error => {console.error(error.status, error.responseText);});

  };

  FacultatVC.prototype.updateController = function(id) {
    $.ajax({
      dataType: "json",
      method: "PUT",
      url: this.url + '/' + 'update/id/'+ id,
      data: {
        nom: $(this.id+' input[name=nom]').val(),
        direccio: $(this.id+' input[name=direccio]').val(),
        universitat: $(this.id+' input[name=universitat]').val()
      }
    })
    .then(() => {this.listController();})
    .catch(error => {console.error(error.status, error.responseText);});

  };
  
  FacultatVC.prototype.deleteController = function(id) {
    $.ajax({
      dataType: "json",
      method: "DELETE",
      url: this.url + '/' +'destroy/id/'+ id,
      data: {
        nom: $(this.id+' input[name=nom]').val(),
        direccio: $(this.id+' input[name=direccio]').val(),
        universitat: $(this.id+' input[name=universitat]').val()
      }
    })
    .then(() => {this.listController();})
    .catch(error => {console.error(error.status, error.responseText);});

  };

  // ROUTER
  FacultatVC.prototype.eventsController = function() {
    $(document).on('click', this.id+' .list',   () => this.listController());
    $(document).on('click', this.id+' .new',    () => this.newController());
    $(document).on('click', this.id+' .edit',   (e)=> this.editController(Number($(e.currentTarget).attr('facultatid'))));
    $(document).on('click', this.id+' .create', () => this.createController());
    $(document).on('click', this.id+' .update', (e)=> this.updateController(Number($(e.currentTarget).attr('facultatid'))));
    $(document).on('click', this.id+' .delete', (e)=> this.deleteController(Number($(e.currentTarget).attr('facultatid'))));
    $(document).on('keypress', this.id+' .form',(e) => {if (e.keyCode === 13) $(this.id+ " button[type=submit]").trigger("click");});
  };

  this.listController();
  this.eventsController();
}

//Desplaçament View Controller:
function DesplacamentVC(ajaxUrl, name = "Desplaçament", id = "#displacements") {
  this.name = name;
  this.id = id;
  this.url = ajaxUrl;

   // VIEWs
  DesplacamentVC.prototype.desplacamentList = function(desplacaments) {
    desplacaments.forEach((ac,desplacament) => console.log(desplacament));
    desplacaments.reduce(
      (ac, desplacament) => console.log(desplacament.id+' '+desplacament.data));

    return `<h1 class="center">${this.name} list</h1>
    <div class="topnav">
    <a><button class="new">Afegir desplaçament</button></a>
    <a><input type="text" id="myInput3" onkeyup="filtreDataDesplacament()" placeholder="Buscar per data.." title="Escriviu una data"></a>
    </div>
    <table id="desplacaments" class="table">
    <tr>
      <th>Estudiant</th>
      <th>Facultat</th>
      <th>Distancia</th>
      <th>Data</th>
      <th>Eliminar/Editar</th>
    </tr>
    ` +
    desplacaments.reduce(
      (ac, desplacament) => ac += 
      `<tr>
        <td>${desplacament.estudiant.nom}</td>
        <td>${desplacament.facultat.nom}</td>
        <td>${desplacament.distancia}</td>
        <td>${desplacament.data}</td>
        <td><button type="submit" class="delete" desplacamentid="${desplacament.id}" title="Delete"> <img src="public/icon_delete.png"/> </button>
            <button type="button" class="edit"   desplacamentid="${desplacament.id}" title="Edit"  > <img src="public/icon_edit.png"/> </button>
        </td>
      </tr>\n`, 
      "");
  };

  DesplacamentVC.prototype.desplacamentForm = function(msg, id, action, estudiant, facultat, distancia, data) {
    console.log(action);
    if (action==="create") {
      return `<h1>${this.name} form</h1>
      ${msg}: <p class="form">
      <input type="text" name="estudiant"  value="${estudiant}" placeholder="estudiant"/>
      <input type="text" name="facultat"  value="${facultat}" placeholder="facultat"/>
      <input type="text" name="distancia"  value="${distancia}" placeholder="distancia"/>
      <input type="datetime" name="data"  value="${data}" placeholder="data"/>
      <button type="submit" class="${action}" desplacamentid="${id}">${action}</button>
      </p>
      <button class="list">Go back</button>
      `;

    }else{
      return `<h1>${this.name} form</h1>
      ${msg}: <p class="form">
      <input type="text" name="estudiant"  value="${estudiant}" placeholder="estudiant" readonly/>
      <input type="text" name="facultat"  value="${facultat}" placeholder="facultat" readonly/>
      <input type="text" name="distancia"  value="${distancia}" placeholder="distancia"/>
      <input type="datetime" name="data"  value="${data}" placeholder="data"/>
      <button type="submit" class="${action}" desplacamentid="${id}">${action}</button>
      </p>
      <button class="list">Go back</button>
      `;

    }
    
  };


  // CONTROLLERs

  DesplacamentVC.prototype.listController = function() {
    let p1 = $.ajax({
      dataType: "json",
      method: "GET",
      url: this.url + '/list/'
    });
    Promise.all([p1])
    .then(([r1]) => {
      let desplacaments = r1;
      console.log(desplacaments);
      //Treu el primer desplaçament
      console.log(desplacaments[0].id);
      console.log(desplacaments[0].estudiant.nom);
      console.log(desplacaments[0].facultat.nom);
      console.log(desplacaments[0].distancia);
      console.log(desplacaments[0].data);
      $(this.id).html(this.desplacamentList(desplacaments));
    })
    .catch(error => {console.error(error.status, error.responseText);});
  };

  DesplacamentVC.prototype.newController = function() {
    $(this.id).html(this.desplacamentForm('Afegir desplaçament', null, 'create', '', '','', ''));
    $(this.id+' input[name=estudiant]').focus();
    $(this.id+' input[name=facultat]').focus();
    $(this.id+' input[name=distancia]').focus();
    $(this.id+' input[name=data]').focus();
  };

  DesplacamentVC.prototype.editController = function(id) {
    console.log("Que pasa "+id);
    $.ajax({
      dataType: "json",
      method: "GET",
      url: this.url + '/find/id/' + id
    })
    .then(r => {
      let desplacament = r;
      console.log(desplacament);
      console.log(desplacament[0]);
      console.log(desplacament[0].estudiant.nom);
      console.log(desplacament[0].facultat.nom);
      console.log(desplacament[0].distancia);
      console.log(desplacament[0].data);
      $(this.id).html(this.desplacamentForm('Edit desplacament', id, 'update', desplacament[0].estudiant.nom, desplacament[0].facultat.nom, desplacament[0].distancia, desplacament[0].data));
      $(this.id+' input[name=estudiant]').focus();
      $(this.id+' input[name=facultat]').focus();
      $(this.id+' input[name=distancia]').focus();
      $(this.id+' input[name=data]').focus();
      })
    .catch(error => {console.error(error.status, error.responseText);});
  };

  DesplacamentVC.prototype.createController = function() {
    $.ajax({
      dataType: "json",
      method: "POST",
      url: this.url+ '/create',
      data: {
        estudiant: $(this.id+' input[name=estudiant]').val(),
        facultat: $(this.id+' input[name=facultat]').val(),
        distancia: $(this.id+' input[name=distancia]').val(),
        data: $(this.id+' input[name=data]').val()
      }
    })
    .then(() => {this.listController();})
    .catch(error => {console.error(error.status, error.responseText);});

  };

  DesplacamentVC.prototype.updateController = function(id) {
    console.log("Que pasa "+id);
    $.ajax({
      dataType: "json",
      method: "PUT",
      url: this.url + '/' + 'update/id/'+ id,
      data: {
        estudiant: $(this.id+' input[name=estudiant]').val(),
        facultat: $(this.id+' input[name=facultat]').val(),
        distancia: $(this.id+' input[name=distancia]').val(),
        data: $(this.id+' input[name=data]').val()
      }
    })
    .then(() => {this.listController();})
    .catch(error => {console.error(error.status, error.responseText);});

  };
  
  DesplacamentVC.prototype.deleteController = function(id) {
    $.ajax({
      dataType: "json",
      method: "DELETE",
      url: this.url + '/' +'destroy/id/'+ id,
      data: {
        estudiant: $(this.id+' input[name=estudiant]').val(),
        facultat: $(this.id+' input[name=facultat]').val(),
        distancia: $(this.id+' input[name=distancia]').val(),
        data: $(this.id+' input[name=data]').val()
      }
    })
    .then(() => {this.listController();})
    .catch(error => {console.error(error.status, error.responseText);});

  };

  // ROUTER
  DesplacamentVC.prototype.eventsController = function() {
    $(document).on('click', this.id+' .list',   () => this.listController());
    $(document).on('click', this.id+' .new',    () => this.newController());
    $(document).on('click', this.id+' .edit',   (e)=> this.editController(Number($(e.currentTarget).attr('desplacamentid'))));
    $(document).on('click', this.id+' .create', () => this.createController());
    $(document).on('click', this.id+' .update', (e)=> this.updateController(Number($(e.currentTarget).attr('desplacamentid'))));
    $(document).on('click', this.id+' .delete', (e)=> this.deleteController(Number($(e.currentTarget).attr('desplacamentid'))));
    $(document).on('keypress', this.id+' .form',(e) => {if (e.keyCode === 13) $(this.id+ " button[type=submit]").trigger("click");});
  };

  this.listController();
  this.eventsController();
}



// Creation of an object View-Controller for the students
let student_vc = new StudentVC('http://localhost:8000/api/estudiant');
let facultat_vc = new FacultatVC('http://localhost:8000/api/facultat');
let desplacament_vc = new DesplacamentVC('http://localhost:8000/api/desplacament');
});