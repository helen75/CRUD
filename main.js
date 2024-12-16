const localStorageKey = "users_list_2";

let users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

console.log(users);

function temizle() {
  localStorage.clear();
}

function addUser() {
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  if (name == "") {
    alert("kullanici adi bos birakilamz");
  } else if (email == "") {
    alert("email bos birakilamaz");
  } else {
    const mevcutUser = users.find((user) => user.email === email);
    if (mevcutUser) {
      mevcutUser.name = name;
    } else {
      users.push({ name, email });
    }

    localStorage.setItem(localStorageKey, JSON.stringify(users));

    console.log(localStorage.getItem(localStorageKey));
  }
}

function displayUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach((user) => {
    const listItem = document.createElement("li");
    console.log(user);
    listItem.innerHTML = `
      Kullanici adi: ${user.name}
      </br>
      Email: ${user.email}
      </br>
      <button onclick="editUser('${user.email}')">Düzenle</button>
      <button onclick="deleteUser('${user.email}')">Sil</button>
      </br>
      </br>
       
      <div>------------------------------</div>
    `;
    userList.appendChild(listItem);
  });
}

displayUsers();

function editUser(email) {
  const userToEdit = users.find((user) => user.email === email);

  if (userToEdit) {
    document.getElementById("username").value = userToEdit.name;
    document.getElementById("email").value = userToEdit.email;
  }
}

function deleteUser(email) {
  users = users.filter((user) => user.email !== email);
  localStorage.setItem(localStorageKey, JSON.stringify(users));
  displayUsers();
}

