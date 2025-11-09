const serverList = [
  {
    id: 1,
    name: "Server-CSR1",
    ip: "192.168.30.101",
    user: "admin",
    type: "shell",
    status: "up"
  },
  {
    id: 2,
    name: "Server-CSR2",
    ip: "192.168.30.102",
    user: "admin",
    type: "shell",
    status: "down"
  },
  {
    id: 3,
    name: "Server-CSR3",
    ip: "192.168.30.103",
    user: "admina",
    type: "shell",
    status: "down"
  },
  {
    id: 4,
    name: "PRTG System",
    ip: "192.168.30.12",
    user: "prtgadmin",
    type: "web",
    status: "up"
  },
  {
    id: 5,
    name: "Solarwinds",
    ip: "192.168.30.5",
    user: "admin",
    type: "web",
    status: "up"
  },
  {
    id: 6,
    name: "Cisco ISE 2.0",
    ip: "192.168.30.104",
    user: "admin",
    type: "web",
    status: "up"
  },
  {
    id: 7,
    name: "Cisco ISE 2.7",
    ip: "192.168.30.105",
    user: "admin",
    type: "web",
    status: "up"
  },
  {
    id: 8,
    name: "Dalo-radius",
    ip: "192.168.30.106",
    user: "dalo-radius",
    type: "web",
    status: "up"
  },
  {
    id: 9,
    name: "PRTG-Server-2016",
    ip: "Unkown",
    user: "",
    type: "web",
    status: "down"
  },
  {
    id: 10, 
    name: "server-gns3",
    ip: "192.168.60.3",
    user: "",
    type: "shell",
    status: "down"
  },
  {
    id: 11, 
    name: "ESXI 6.5",
    ip: "192.168.30.22",
    user: "root",
    type: "web",
    status: "up"
  },
  {
    id: 12, 
    name: "iperf",
    ip: "192.168.60.145",
    user: "client1",
    type: "shewebll",
    status: "up"
  },
  {
    id: 13, 
    name: "laptop",
    ip: "192.168.101.32",
    user: "laptop2",
    type: "shewebll",
    status: "up"
  }
];

function getServerIcon(type) {
  if (type === "web") return `
    <svg fill="#fff" width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#337dff"/><path d="M17.72 9A7.997 7.997 0 0 0 6.28 9m11.44 6A7.997 7.997 0 0 1 6.28 15M12 2v20" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="3.2" fill="#07cabf"/></svg>
  `;
  return `
    <svg fill="#fff" width="32" height="32" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="13" rx="3" fill="#17de4e"/><rect x="3" y="16" width="18" height="3" rx="3" fill="#337dff"/><text x="7" y="15" font-size="7" fill="#fff">ssh</text></svg>
  `;
}

function renderServers(list) {
  const container = document.getElementById('server-list');
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<div class="no-server">سروری با این جستجو یافت نشد.</div>`;
    return;
  }

  list.forEach(server => {
    const card = document.createElement('div');
    card.className = 'server-card';

    const logo = document.createElement('span');
    logo.className = 'server-logo ' + server.type;
    logo.innerHTML = getServerIcon(server.type);

    const nameEl = document.createElement('div');
    nameEl.className = "server-name";
    nameEl.textContent = server.name;

    const ipEl = document.createElement('div');
    ipEl.className = "server-ip";
    ipEl.textContent = server.ip;

    let userEl = null;
    if (server.user) {
      userEl = document.createElement('div');
      userEl.className = "server-user";
      userEl.textContent = "کاربر: " + server.user;
    }

    const statusBox = document.createElement('div');
    statusBox.className = "status-box";
    const statusDot = document.createElement('span');
    statusDot.className = "status-dot " + (server.status === "up" ? "up" : "down");
    statusDot.title = server.status === "up" ? "آنلاین" : "آفلاین";
    const statusText = document.createElement('span');
    statusText.className = "status-text";
    statusText.textContent = server.status === "up" ? "آنلاین" : "آفلاین";
    statusBox.appendChild(statusDot);
    statusBox.appendChild(statusText);

    const connectBtn = document.createElement('button');
    connectBtn.className = 'connect-btn';
    connectBtn.textContent = "اتصال سریع";
    connectBtn.onclick = () => connectToServer(server);

    card.appendChild(logo);
    card.appendChild(nameEl);
    card.appendChild(ipEl);
    if (userEl) card.appendChild(userEl);
    card.appendChild(statusBox);
    card.appendChild(connectBtn);

    container.appendChild(card);
  });
}

function connectToServer(server) {
  if (server.type === "web") {
    let url = server.ip.startsWith("http") ? server.ip : "http://" + server.ip;
    window.open(url, '_blank');
  } else if (server.type === "shell") {
    let url = `ssh://${server.user}@${server.ip}`;
    window.open(url);
  } else {
    alert("نوع سرور ناشناخته است!");
  }
}

function searchHandler() {
  const query = document.getElementById('server-search').value.trim().toLowerCase();
  const filtered = serverList.filter(server =>
    server.name.toLowerCase().includes(query) ||
    server.ip.toLowerCase().includes(query)
  );
  renderServers(filtered);
}

window.onload = () => {
  renderServers(serverList);
  document.getElementById('server-search').addEventListener('input', searchHandler);
};