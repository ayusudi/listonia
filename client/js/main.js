function sendform(){
    let date = new Date()
      let bulan = date.getMonth() + 1
      let tanggal = date.getDate()
      if (tanggal<10){
        tanggal = '0'+tanggal.toString()
      }
      if (bulan <10){
        bulan = '0'+bulan.toString()
      }
      let formatDate = date.getFullYear()+ "-" + bulan + "-" +  tanggal
    $('#createTodo-s').empty()
    $('#createTodo-s').append(`
    <label>Title i</label>
    <input type="text" class="form-control" id="input-title" placeholder="Title" required="true">
    <label>Description</label>
    <textarea class="form-control" id="input-description" rows="3" required="true"
        placeholder="description"></textarea>
    <div class="form-group">
        <label>Due Date</label>
        <input type="date" min="${formatDate}" value="${formatDate}" placeholder=${formatDate}  class="form-control" id="input-dueDate"
        required> </div>
    <div class="form-group d-flex justify-content-end">
        <button type="submit" class="btn btn-dark mt-4 mb-3 mx-1" data-dismiss="modal"
            onclick="createTodo()">Submit</button>
    </div>
    `)
}

function showformGroup(){
    console.log('hereeee');
    let date = new Date()
      let bulan = date.getMonth() + 1
      let tanggal = date.getDate()
      if (tanggal<10){
        tanggal = '0'+tanggal.toString()
      }
      if (bulan <10){
        bulan = '0'+bulan.toString()
      }
      let formatDate = date.getFullYear()+ "-" + bulan + "-" +  tanggal
      $('#inGroup').empty()
      $('#inGroup').append(`
      <label>Title</label>
      <input type="text" class="form-control" id="input-title-p" placeholder="Title"
          required="true">
      <label>Description</label>
      <textarea class="form-control" id="input-description-p" rows="3" required="true"
          placeholder="description"></textarea>
      <div class="form-group">
          <label>Due Date</label>
          <input type="date" class="form-control" id="input-dueDate-p"
              required="true" min="${formatDate}" value="${formatDate}" placeholder=${formatDate}>
      </div>
      <button type="submit" class="btn btn-dark mt-4 mb-3 mx-1" data-dismiss="modal"
          onclick="createTodoInGroup()">Submit</button>
      `)
}



$(document).ready(function () {
  $('.todo.default').empty()
  $('.todo.default').append(`
  <div class="headerTodo mx-5 my-4">
        <div class="api">
            <button class="btn btn-light btn-lg" onclick="getJoke()"  id="todoButtonCreate" data-toggle="modal"
            data-target="#ModalJoke">Get Jokes</button>
            <button id="todoButtonCreate" data-toggle="modal" class="btn btn-dark btn-lg" onclick="sendform()"
                data-target="#ModalCreate">Create
                Todo</button>
        </div>
    </div>
    <div class="listtodo">
        <div class="undone c-black">
            <h1>Uncomplete</h1>
            <div class="undone-personal roboto"></div>

        </div>
        <div class="done c-black">
            <h1>Completed</h1>
            <div class="done-personal roboto">

            </div>
        </div>
    </div>
    `)

  $('.todo.myprojects').empty()
  $('.todo.myprojects').append(`
        <div class="headerProject my-5">
            <button class="btn btn-light btn-lg downgip" id="todoButtonCreate" data-toggle="modal"
            data-target="#ModalCreateProject">Create Group Project</button>
        </div>
        <div class="boxproject mb-5">
            <div class="listgroup p-4">
            </div>
        </div>
    `)
})