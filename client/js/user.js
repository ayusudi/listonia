let baseUrl = 'http://localhost:3000'
$(document).ready(function () {
  if (localStorage.getItem('token')) {
    isLogin()
  }
  $('#createTodo').submit(function(){
    createTodo()
  })
})

$('form').click(function name(event) {
  event.preventDefault();
})

function registerMe() {
  let name = $('#nameRegist').val()
  let email = $('#emailRegist').val()
  let password = $('#passwordRegist').val()

  axios({
    method: 'post',
    url: baseUrl + '/users/register',
    data: {
      name,
      email,
      password
    }
  })
    .then(({
      data
    }) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('_id', data._id)
      $('.landingpage').hide()

    })
    .catch(err => {
      let text = err.response.data.msg.join('<br>')
      Swal.fire({
      title: 'Error!',
      html: text,
      type: 'error',
      confirmButtonText: 'Oke'
    })
      // console.log(err.response.data.msg);
    })
  $('input').val('')
}

function signMe() {
  let email = $('#emailSign').val()
  let password = $('#passwordSign').val()
  // console.log({
  //   email,
  //   password
  // })
  axios({
    method: 'post',
    url: baseUrl + '/users/login',
    data: {
      email,
      password
    }
  })
    .then(({
      data
    }) => {
      // console.log(data);
      localStorage.setItem('token', data.token)
      localStorage.setItem('_id', data._id)
      isLogin()
    })
    .catch(err => {
      let text = err.response.data.msg.join('<br>')
      Swal.fire({
      title: 'Error!',
      html: text,
      type: 'error',
      confirmButtonText: 'Oke'
    })
      // console.log(err.response.data.msg)
    })
  $('input').val('')
}

function isLogin() {
  //fetch todo 
  personalTodo()
  $("div.cursor").remove()
  $('.landingpage').hide()
  $('.toleft').hide()
  $('.navbari').css("justify-content", "space-around")
  $('.navbari').css("align-items","center")
  // $('.cursor').empty()
  $('.navbari').append(`
  <div class="cursor c-white" id="myTodos" onclick="myTodosbtn()"><h2>Todos</h2></div>
  <div class="cursor c-white" id="myProjects" onclick="myProjectsbtn()"><h2>Projects</h2></div>
  <div class="cursor c-white" id="logoutMe" onclick="logoutMebtn()"><h2>Logout</h2></div>`)
  $('.todo.projects').hide()
  $('.todo.one-project').hide()
  $('.aftersignIn').show()
  $('.todo.default').show()
}

function getDeadline(date) {
  let day = 24 * 3600 * 1000
  let today = new Date().getTime()
  let dueDate = new Date(date).getTime()
  let difference = Math.floor((dueDate - today) / day)
  if (difference < 0) {
    return `<p style="color:red">It's already pass ${Math.abs(difference)} days</p>`
  } else if (difference === 0) {
    return '<p style="color:green">Today</p>'
  } else {
    return `<p style="color:green">${difference} days left</p>`
  }
}


function personalTodo(){
  console.log('heree');
  $('.done-personal').empty()
  $('.undone-personal').empty()
  axios({
    method: 'get',
    url: baseUrl + '/todos/',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .then(({ data }) => {
      let todos = data.todos
      if (todos.length > 0) {
        todos.forEach(el => {
          let getDaysLeft = getDeadline(el.dueDate)
          console.log(getDaysLeft);
          let dueDate = new Date(el.dueDate).toDateString()
          if (el.status){
            $('.done-personal').append(
              `  
              <div class="onetodo d-flex justify-content-between my-3 mx-2">
              <article class="px-2 py-2">
                <h4>${el.name}</h4>
                <p class="m-width">${el.description}</p>
                <b>${getDaysLeft}</b>
              </article>
              <aside class="d-flex justify-content-end align-items-center m-2">
                <button class="btn btn-yel btn-circle" onclick="changeStatus('${el._id}', false)"><i class="fas fa-undo-alt"></i></button>
                <button class="btn btn-grey btn-circle" onclick="todoDetails('${el._id}')"  id="todoButtonCreate" data-toggle="modal"
                data-target="#ModalEdit"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn btn-dark btn-circle"  onclick="deleteTodo('${el._id}')"><i class="fas fa-trash"></i></button>
              </aside>
            </div>
              `
            )
          }
          else {
            $('.undone-personal').append(
              `
              <div class="onetodo d-flex justify-content-between my-3 mx-2">
                <article class="px-2 py-2">
                  <h4>${el.name}</h4>
                  <p class="m-width">${el.description}</p>
                  <b>${getDaysLeft}</b>
                </article>
                <aside class="d-flex justify-content-end align-items-center m-2">
                  <button class="btn btn-soft btn-circle"><i class="fas fa-check" onclick="changeStatus('${el._id}', true)"></i></button>
                  <button class="btn btn-grey btn-circle" onclick="todoDetails('${el._id}')"  id="todoButtonCreate" data-toggle="modal"
                  data-target="#ModalEdit"><i class="fas fa-pencil-alt"></i></button>
                  <button class="btn btn-dark btn-circle"  onclick="deleteTodo('${el._id}')"><i class="fas fa-trash"></i></button>
                </aside>
              </div>
              `
            )
            // console.log(el , 'isfalse');
          }
        });
      }
    })
    .catch(err => {
      Swal.fire({
      title: 'Error!',
      text: '',
      type: 'error',
      confirmButtonText: 'Oke'
    })
      // console.log(err);
    })
}