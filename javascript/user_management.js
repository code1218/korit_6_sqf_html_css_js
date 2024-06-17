// inputMode = 1 > 추가
// inputMode = 2 > 수정
let inputMode = 1;

let userList = [];
loadUserList();

let emptyUser = {
    id: 0,
    name: "",
    username: "",
    password: ""
};

let user = {
    ...emptyUser
}

function renderTable() {
    const userTableBody = document.querySelector(".user-table-body");
    userTableBody.innerHTML = userList.map(({id, name, username, password}, index) => {
        return `
            <tr>
                <th><input type="checkbox" onchange="handleUserCheck(event)"></th>
                <td>${index + 1}</td>
                <td>${id}</td>
                <td>${name}</td>
                <td>${username}</td>
                <td>${password}</td>
                <th><button onclick="deleteUser(event)" value="${id}">삭제</button></th>
            </tr>
        `;
    }).join("");
}

function handleUserInputKeyDown(e) {
    user = {
        ...user,
        [e.target.name]: e.target.value
    }

    // user[e.target.name] = e.target.value;

    if(e.keyCode === 13) {
        const nameInput = document.querySelector(".name-input");
        const usernameInput = document.querySelector(".username-input");
        const passwordInput = document.querySelector(".password-input");

        if(e.target.name === "name") {
            usernameInput.focus();
        }
        if(e.target.name === "username") {
            passwordInput.focus();
        }
        if(e.target.name === "password") {
            userList = [ ...userList, { ...user, id: getNewId() } ];

            saveUserList();
            renderTable();

            nameInput.value = emptyUser.name;
            usernameInput.value = emptyUser.username;
            passwordInput.value = emptyUser.password;

            nameInput.focus();
        }
    }
}

function saveUserList() {
    localStorage.setItem("userList", JSON.stringify(userList));
}

function loadUserList() {
    const lsUserList = localStorage.getItem("userList");
    userList = !lsUserList ? [] : JSON.parse(lsUserList);
    renderTable();
}

function deleteUser(e) {
    userList = userList.filter(({id}) => id !== parseInt(e.target.value));
    saveUserList();
    renderTable();
}

function getNewId() {
    const userIds = userList.map(user => user.id);
    const maxUserId = userIds.length === 0 ? 20240000 : Math.max.apply(null, userIds);
    return maxUserId + 1;
}

function handleUserCheck(e) {
    
}