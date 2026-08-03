/*  DATOS*/
const MENU = [
  {
    id: 1,
    img: 'https://comidasperuanas.net/wp-content/uploads/2023/08/Receta-de-Pollo-a-la-Plancha.jpg',
    name: 'Pollo a la plancha',
    includes: 'Arroz blanco · Ensalada fresca · Jugo natural',
    tags: ['Alto en proteína', 'Sin gluten'],
    available: 45
  },
  {
    id: 2,
    img: 'https://familiakitchen.com/wp-content/uploads/2022/03/Salad-carne-asada-9.jpg',
    name: 'Carne asada',
    includes: 'Papas fritas · Ensalada · Jugo natural',
    tags: ['Favorito'],
    available: 30
  },
  {
    id: 3,
    img: 'https://cocinaperuana.espaciolatino.com/recetas-de-pescado/img600/filete-pescado-kion.jpg',
    name: 'Filete de pescado',
    includes: 'Arroz · Patacones · Limonada',
    tags: ['Bajo en grasa', 'Saludable'],
    available: 20
  },
  {
    id: 4,
    img: 'https://images.happycow.net/venues/1024/20/81/hcmp20812_1532860.jpeg',
    name: 'Bandeja vegetariana',
    includes: 'Lentejas · Arroz integral · Ensalada · Jugo',
    tags: ['Vegetariano', 'Saludable'],
    available: 18
  },
  {
    id: 5,
    img: 'https://imag.bonviveur.com/espaguetis-a-la-bolonesa.jpg',
    name: 'Pasta boloñesa',
    includes: 'Pasta con carne · Pan · Limonada',
    tags: ['Especial del día'],
    available: 12
  },
   {
    id: 6,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvf7yObhBe3uHK1eliIF2Alk4d8Cp61cVvwCSXVe10vlZb8sGoWNObMYM&s=10',
    name: 'Arroz con pollo',
    includes: 'Papa a la francesa · ensalada de pasta · Jugo de mango',
    tags: ['Completo'],
    available: 25
  }
];
let reservations = [];
let codeCounter = 2548;
let selectedMenuId = null;
/*INICIALIZAR*/
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderReservations();
  goTo('home');
});
/* NAVEGACIÓN*/
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}
function setSidebarActive(btnId) {
  document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(btnId)?.classList.add('active');
}
/*RENDER MENÚ*/
function renderMenu() {
  const container = document.getElementById('menu-grid');
  container.innerHTML = '';
  MENU.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.id = 'menu-card-' + item.id;
    card.onclick = () => selectMenu(item.id);
    const tagsHTML = item.tags.map(t =>
      `<span class="tag ${t === 'Favorito' || t === 'Especial del día' ? 'green' : ''}">${t}</span>`
    ).join('');
    card.innerHTML = `
      <img class="menu-card-img" src="${item.img}" alt="${item.name}" />
      <div class="menu-card-info">
        <h3>${item.name}</h3>
        <p class="includes">${item.includes}</p>
        <div class="tag-row">${tagsHTML}</div>
        <p style="font-size:0.75rem;color:#6B7280;margin-top:0.35rem;font-weight:600;">
          ${item.available} disponibles
        </p>
      </div>
      <div class="menu-card-radio" id="radio-${item.id}"></div>
    `;
    container.appendChild(card);
  });
}
/* SELECCIONAR PLATO*/
function selectMenu(id) {
  if (selectedMenuId) {
    document.getElementById('menu-card-' + selectedMenuId)?.classList.remove('selected');
  }
  selectedMenuId = id;
  document.getElementById('menu-card-' + id).classList.add('selected');
  const btn = document.getElementById('btn-reservar');
  btn.disabled = false;
  btn.textContent = `Reservar — ${MENU.find(m => m.id === id).name}`;
}
/* RESERVAR*/
function reservar() {
    const ahora = new Date();
  const hora = ahora.getHours();
  const minutos = ahora.getMinutes();
  const totalMinutos = hora * 60 + minutos;
  const apertura = 7 * 60;  
  const cierre = 11 * 60;   
  if (totalMinutos < apertura || totalMinutos > cierre) {
    showToast('Las reservas solo están disponibles de 7:00 AM a 11:00 AM');
    return;
  }
  if (!selectedMenuId) return;
  const yaReservado = reservations.some(r => r.menuId === selectedMenuId && r.active);
  if (yaReservado){
    showToast('Ya tienes una reserva activa para este plato');
    return;
  } 
  const item = MENU.find(m => m.id === selectedMenuId);
  if (item.available <= 0) {
    showToast('No hay disponibilidad para este plato');
    return;
  }
  item.available--;
  const code = 'ALM-' + codeCounter++;
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-CO', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
  const reservation = {
    id: code,
    menuId: item.id,
    img: item.img,
    name: item.name,
    date: dateStr,
    time: '12:30 PM',
    status: 'Confirmado',
    active: true
  };
  reservations.unshift(reservation);
  // Pantalla de confirmación
  document.getElementById('conf-code').textContent = code;
  document.getElementById('conf-date').textContent = dateStr;
  document.getElementById('conf-dish').textContent = item.name;
  document.getElementById('conf-img').innerHTML =
    `<img src="${item.img}" alt="${item.name}" style="width:60px;height:60px;border-radius:10px;object-fit:cover;" />`;
  updateAvailPill();
  renderMenu();
  selectedMenuId = null;
  document.getElementById('btn-reservar').disabled = true;
  document.getElementById('btn-reservar').textContent = 'Selecciona un plato para reservar';
  goTo('confirm');
}
/*DISPONIBILIDAD TOTAL*/
function updateAvailPill() {
  const total = MENU.reduce((s, m) => s + m.available, 0);
  document.getElementById('total-avail').textContent = total + ' almuerzos disponibles hoy';
}
/* RENDER RESERVAS*/
function renderReservations() {
  const activas   = reservations.filter(r => r.active);
  const historial = reservations.filter(r => !r.active);
  renderResList('panel-activas',   activas,   'No tienes reservas activas', '📭');
  renderResList('panel-historial', historial, 'Tu historial está vacío',    '🗂️');
}
function renderResList(containerId, list, emptyMsg, emptyIcon) {
  const el = document.getElementById(containerId);
  if (list.length === 0) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${emptyIcon}</div>
        <p>${emptyMsg}</p>
      </div>`;
    return;
  }
  el.innerHTML = '';
  list.forEach(r => {
    const badgeClass = r.status === 'Confirmado' ? 'badge-confirmed'
                     : r.status === 'Pendiente'  ? 'badge-pending'
                     : 'badge-cancelled';
    const cancelBtn = r.active
      ? `<button class="btn-cancel-res" onclick="cancelReservation('${r.id}')">Cancelar</button>`
      : '';
    const card = document.createElement('div');
    card.className = 'res-card';
    card.innerHTML = `
      <div class="res-card-top">
        <span class="code">${r.id}</span>
        <span class="${badgeClass}">${r.status}</span>
      </div>
      <div class="res-card-dish">
        <img class="dish-img" src="${r.img}" alt="${r.name}" />
        <span class="dish-name">${r.name}</span>
      </div>
      <div class="res-card-meta">
        <div class="meta-item">
          <label>Fecha</label>
          <span>${r.date}</span>
        </div>
        <div class="meta-item">
          <label>Hora de reclamo</label>
          <span>${r.time}</span>
        </div>
      </div>
      <div class="res-card-footer">
        ${cancelBtn}
        <button class="btn-detail" onclick="openModal('${r.id}')">Ver detalle</button>
      </div>
    `;
    el.appendChild(card);
  });
}
/*CANCELAR RESERVA*/
function cancelReservation(id) {
  const confirmado = confirm('¿Estás seguro de que deseas cancelar esta reserva?');
  if (!confirmado) return;
  const r = reservations.find(x => x.id === id);
  if (!r) return;
  r.status = 'Cancelado';
  r.active = false;
  const item = MENU.find(m => m.id === r.menuId);
  if (item) item.available++;
  updateAvailPill();
  renderMenu();
  renderReservations();
  showToast('Reserva cancelada');
}
/*TABS*/
function setTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('panel-activas').style.display   = tab === 'activas'   ? '' : 'none';
  document.getElementById('panel-historial').style.display = tab === 'historial' ? '' : 'none';
}
/*MODAL DETALLE*/
function openModal(id) {
  const r = reservations.find(x => x.id === id);
  if (!r) return;
  document.getElementById('m-img').innerHTML =
    `<img src="${r.img}" alt="${r.name}" style="width:48px;height:48px;border-radius:8px;object-fit:cover;" />`;
  document.getElementById('m-name').textContent   = r.name;
  document.getElementById('m-code').textContent   = r.id;
  document.getElementById('m-date').textContent   = r.date;
  document.getElementById('m-time').textContent   = r.time;
  document.getElementById('m-status').textContent = r.status;
  document.getElementById('modal').classList.add('open');
}
function closeModal(e) {
  if (e.target === document.getElementById('modal')) {
    document.getElementById('modal').classList.remove('open');
  }
}
function closeModalBtn() {
  document.getElementById('modal').classList.remove('open');
}
/* IR A MIS RESERVAS*/
function goToReservas() {
  renderReservations();
  setTab('activas');
  goTo('reservas');
}
/*TOAST*/
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
/*BELL*/
function bellClick() {
  const count = reservations.filter(r => r.active).length;
  showToast(count > 0 ? `Tienes ${count} reserva(s) activa(s)` : 'Sin notificaciones nuevas');
}
// ── ADMIN NAVEGACIÓN ──
function goToAdmin() {
  renderAdminMenus();
  renderAdminReservas();
  goTo('admin');
}
function setAdminTab(tab) {
  document.querySelectorAll('.admin-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('panel-menus').style.display          = tab === 'menus'          ? '' : 'none';
  document.getElementById('panel-reservas-admin').style.display = tab === 'reservas-admin' ? '' : 'none';
  document.getElementById('panel-reportes').style.display       = tab === 'reportes'       ? '' : 'none';
}
// ── GESTIÓN MENÚS (HU4) ──
function renderAdminMenus() {
  const list = document.getElementById('admin-menu-list');
  list.innerHTML = '';
  MENU.forEach(item => {
    const div = document.createElement('div');
    div.className = 'admin-menu-card';
    div.innerHTML = `
      <img src="${item.img}" style="width:56px;height:56px;border-radius:10px;object-fit:cover;" />
      <div style="flex:1">
        <strong>${item.name}</strong>
        <p style="font-size:0.8rem;color:#6B7280">${item.includes}</p>
        <p style="font-size:0.78rem;color:#2D8A3E;font-weight:700">${item.available} disponibles</p>
      </div>
      <div style="display:flex;gap:0.5rem">
        <button class="btn-detail" onclick="editarCupos(${item.id})">Editar cupos</button>
        <button class="btn-cancel-res" onclick="eliminarPlato(${item.id})">Eliminar</button>
      </div>
    `;
    list.appendChild(div);
  });
}
function editarCupos(id) {
  const item = MENU.find(m => m.id === id);
  const nuevo = prompt(`Cupos disponibles para "${item.name}":`, item.available);
  if (nuevo === null) return;
  const num = parseInt(nuevo);
  if (isNaN(num) || num < 0) { showToast('Número inválido'); return; }
  item.available = num;
  updateAvailPill();
  renderMenu();
  renderAdminMenus();
  showToast('Cupos actualizados');
}
function eliminarPlato(id) {
  const confirmado = confirm('¿Eliminar este plato del menú?');
  if (!confirmado) return;
  const idx = MENU.findIndex(m => m.id === id);
  if (idx !== -1) MENU.splice(idx, 1);
  updateAvailPill();
  renderMenu();
  renderAdminMenus();
  showToast('Plato eliminado');
}
function abrirFormPlato() {
  const nombre   = prompt('Nombre del plato:');
  if (!nombre) return;
  const includes = prompt('Acompañamientos (ej: Arroz · Ensalada · Jugo):');
  const img      = prompt('URL de la imagen:');
  const cupos    = parseInt(prompt('Cupos disponibles:'));
  if (isNaN(cupos)) { showToast('Cupos inválidos'); return; }
  const nuevoId = MENU.length > 0 ? Math.max(...MENU.map(m => m.id)) + 1 : 1;
  MENU.push({ id: nuevoId, img: img || '', name: nombre, includes: includes || '', tags: [], available: cupos });
  updateAvailPill();
  renderMenu();
  renderAdminMenus();
  showToast('Plato agregado');
}
// ── RESERVAS ADMIN (HU5) ──
function renderAdminReservas(lista = reservations) {
  const el = document.getElementById('admin-reservas-list');
  if (lista.length === 0) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><p>No hay reservas</p></div>';
    return;
  }
  // Contar por menú
  const conteo = {};
  lista.forEach(r => { conteo[r.name] = (conteo[r.name] || 0) + 1; });
  el.innerHTML = `
    <div class="admin-stats">
      <strong>Total: ${lista.length} reservas</strong>
      <div style="margin-top:0.5rem;font-size:0.85rem">
        ${Object.entries(conteo).map(([n, c]) => `${n}: <b>${c}</b>`).join(' &nbsp;|&nbsp; ')}
      </div>
    </div>
  `;
  lista.forEach(r => {
    const div = document.createElement('div');
    div.className = 'res-card';
    div.style.margin = '0.5rem 1.5rem';
    div.innerHTML = `
      <div class="res-card-top">
        <span class="code">${r.id}</span>
        <span class="${r.status === 'Confirmado' ? 'badge-confirmed' : 'badge-cancelled'}">${r.status}</span>
      </div>
      <div class="res-card-dish">
        <img src="${r.img}" style="width:36px;height:36px;border-radius:8px;object-fit:cover" />
        <span class="dish-name">${r.name}</span>
      </div>
      <div class="res-card-meta">
        <div class="meta-item"><label>Fecha</label><span>${r.date}</span></div>
        <div class="meta-item"><label>Hora</label><span>${r.time}</span></div>
      </div>
    `;
    el.appendChild(div);
  });
}
function filtrarReservasAdmin() {
  const fecha = document.getElementById('filtro-fecha').value;
  if (!fecha) { renderAdminReservas(); return; }
  const [y, m, d] = fecha.split('-');
  const fechaFormato = `${d}/${m}/${y}`;
  const filtradas = reservations.filter(r => r.date === fechaFormato);
  renderAdminReservas(filtradas);
}
// ── REPORTES (HU9) ──
function generarReporte() {
  const desde = document.getElementById('reporte-desde').value;
  const hasta = document.getElementById('reporte-hasta').value;
  if (!desde || !hasta) { showToast('Selecciona un rango de fechas'); return; }
  const toDate = str => { const [y,m,d] = str.split('-'); return new Date(y, m-1, d); };
  const parseDate = str => { const [d,m,y] = str.split('/'); return new Date(y, m-1, d); };
  const filtradas = reservations.filter(r => {
    const f = parseDate(r.date);
    return f >= toDate(desde) && f <= toDate(hasta);
  });
  const conteo = {};
  filtradas.forEach(r => { conteo[r.name] = (conteo[r.name] || 0) + 1; });
  const el = document.getElementById('reporte-resultado');
  if (filtradas.length === 0) {
    el.innerHTML = '<p style="padding:1rem;color:#6B7280">No hay reservas en ese período</p>';
    return;
  }
  el.innerHTML = `
    <div class="admin-stats">
      <strong>Total de reservas: ${filtradas.length}</strong>
      <table style="width:100%;margin-top:0.75rem;border-collapse:collapse;font-size:0.88rem">
        <thead>
          <tr style="background:#E8F5EB">
            <th style="padding:0.5rem;text-align:left">Plato</th>
            <th style="padding:0.5rem;text-align:center">Reservas</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(conteo).map(([n, c]) => `
            <tr style="border-bottom:1px solid #E5E7EB">
              <td style="padding:0.5rem">${n}</td>
              <td style="padding:0.5rem;text-align:center;font-weight:700">${c}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}
function setBottomActive(btnId) {
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(btnId)?.classList.add('active');
}

function toggleSidebarGroup(e) {
  if (e) e.stopPropagation();
  const grupo = document.getElementById('grupo-cafeteria');
  grupo.classList.toggle('open');
}