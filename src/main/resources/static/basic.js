let targetId;

$(document).ready(function () {
    if ($.cookie('token')) {
        $.ajaxSetup({
            headers:{
                'Authorization': $.cookie('token')
            }
        })
    } else {
        window.location.href = '/user/loginView';
    }

    $.ajax({
        type: "POST",
        url: `/user/userinfo`,
        contentType: "application/json",
        success: function (response) {
            const username = response.username;
            const isAdmin = !!response.admin;
            console.log(response)
            if (!username) {
                window.location.href = '/user/loginView';
            }

            $('#username1').text(username);
        },
        error: function() {
            window.location.href = '/user/loginView';
        }
    })

    $('#close').on('click', function () {
        $('#container').removeClass('active');
    })

    getMessages();
    $('#posts-box').hide();
    $('.nav div.post-see').on('click', function () {
        $('div.post-see').addClass('active');
        $('div.post-edit').removeClass('active');
        $('div.write-post').removeClass('active');
        // $('#cards-box').show();
        // $('#table').show();
        $('#table').show();
        $('#area-write').hide();
        $('#posts-box').hide();
    })
    $('.nav div.write-post').on('click', function () {
        $('div.post-see').removeClass('active');
        $('div.post-edit').removeClass('active');
        $('div.write-post').addClass('active');

        $('#area-write').show();
        $('#posts-box').hide();
        // $('#cards-box').hide();
        $('#table').hide();
    })
    $('.nav div.post-edit').on('click', function () {
        $('div.post-edit').addClass('active');
        $('div.post-see').removeClass('active');
        $('div.write-post').removeClass('active');

        $('#posts-box').show();
        $('#area-write').hide();
        $('#table').hide();
    })
    // $('#cards-box').show();
    $('#table').show();
    $('#area-write').hide();
})

// 미리 작성된 영역 - 수정하지 않으셔도 됩니다.
// 사용자가 내용을 올바르게 입력하였는지 확인합니다.
function isValidContents(title, username, password, contents) {
    if (title === '') {
        alert('제목을 입력해주세요');
        return false;
    }
    if (username === '') {
        alert('닉네임을 입력해주세요');
        return false;
    }
    if (password === '') {
        alert('비밀번호를 입력해주세요');
        return false;
    }
    if (contents === '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 140) {
        alert('공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}

function isValidEdits(contents) {
    if (contents === '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 140) {
        alert('공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}

// 수정 버튼을 눌렀을 때, 기존 작성 내용을 textarea 에 전달합니다.
// 숨길 버튼을 숨기고, 나타낼 버튼을 나타냅니다.
function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}

// 메모를 불러와서 보여줍니다.
function getMessages() {
    // 1. 기존 메모 내용을 지웁니다.
    $('#cards-box').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: '/api/boards',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let message = response[i];
                let id = message['id']; //message.id 가능?
                let title = message['title'];
                let username = message['username'];
                let contents = message['contents'];
                let modifiedAt = message['modifiedAt'];
                addHTML(id, title, username, contents, modifiedAt);
                addPost(id, title, username, contents, modifiedAt);
            }
        }
    })
}
function addPost(id, title, username, contents, modifiedAt){
    let date = modifiedAt.toString().substring(0,10);
    let time = modifiedAt.toString().substring(11,19);
    let modified = date + " " + time;
    let tempHtml = `<div class="card">
                            <!-- date/username 영역 -->
                            <div class="contents">
                                <div id="${id}-title" class="title">
                                    제목 : ${title}
                                </div>
                               <div class="date">
                                    작성 날짜 : ${modified}
                                </div>
                                <div id="${id}-username" class="username">
                                    작성자 : ${username}
                                </div>
                            </div>
                            <!-- contents 조회/수정 영역-->
                            <div class="contents">
                                <div id="${id}-contents" class="text">
                                    ${contents}
                                </div>
                                <div id="${id}-editarea" class="edit">
                                    <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                                </div>
                            </div>
                            <!-- 버튼 영역-->
                            <div class="btn">
                                <img id="${id}-edit" class="icon-start-edit" src="images/edit.png" alt="" onclick="editPost('${id}')">
                                <img id="${id}-delete" class="icon-delete" src="images/delete.png" alt="" onclick="deleteOne('${id}')">
                                <img id="${id}-submit" class="icon-end-edit" src="images/done.png" alt="" onclick="submitEdit('${id}')">
                            </div>
                        </div>`;
    $('#posts-box').append(tempHtml);
}
// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, title, username, contents, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
    let date = modifiedAt.toString().substring(0,10);
    let time = modifiedAt.toString().substring(11,19);
    let modified = date + " " + time;
    console.log(modified);
    let tempHtml = `<tr class="card">
                                <td>${title}</td>
                                <td>${modified}</td>
                                <td>${username}</td>
                            </tr>`
    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}

// 메모를 생성합니다.
function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    let title = $('#title').val();
    let username = $('#username').val();
    let password = $('#password').val();
    let contents = $('#contents').val();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(title, username, password, contents) === false) {
        return;
    }
    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'title': title, 'username': username, 'password': password, 'contents': contents};
    // 4. POST /api/memos 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/boards",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
            window.location.reload();
        }
    });
}

// 메모를 수정합니다.
function submitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    let password = prompt('비밀번호를 입력하세요');
    let contents = $(`#${id}-textarea`).val().trim();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidEdits(contents) === false) {
        return;
    }
    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'password': password, 'contents': contents};
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/boards/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            if(response === true) {
                alert('메시지 변경에 성공하였습니다.');
                window.location.reload();
            } else alert('비밀번호를 확인해주세요')
        }
    });
}

// function showModal(id) {
//     $('#selectpost').append(tempHTML);
//     const modal = document.querySelector(".modal");
//     modal.classList.remove('hidden');
// }
// function closeModal() {
//     const modal = document.querySelector(".modal");
//     modal.classList.add('hidden')
// }

// 게시글을 삭제합니다.
function deleteOne(id) {
    let password = prompt('비밀번호를 입력하세요');
    let data = {'password': password}
    $.ajax({
        type: "DELETE",
        url: `/api/boards/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            if(response === true){
                alert('메시지 삭제에 성공하였습니다.');
                window.location.reload();
            } else alert('비밀번호를 확인해주세요')
        }
    })
}