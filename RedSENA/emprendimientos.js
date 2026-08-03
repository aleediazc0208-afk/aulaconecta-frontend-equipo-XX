/*==========================================================
    REDSENA — EMPRENDIMIENTOS.JS
==========================================================*/

const KEY_EMP = "rs_emprendimientos";

/* ── DATOS DE EJEMPLO ── */
const EMPRENDIMIENTOS_EJEMPLO = [
    {
        id: 1,
        nombre: "Dulces SENA",
        categoria: "Alimentos",
        descripcion: "Venta de postres artesanales elaborados con ingredientes de alta calidad. Tortas, cheesecakes y macarons para toda ocasión.",
        logo: "https://placehold.co/200x200/39A845/white?text=DS",
        productos: [
            { nombre: "Cheesecake frutos rojos", imagen: "https://placehold.co/300x300/FFB6C1/333?text=🍰" },
            { nombre: "Torta de chocolate",      imagen: "https://placehold.co/300x300/8B4513/white?text=🎂" },
            { nombre: "Macarons",                imagen: "https://placehold.co/300x300/FFD700/333?text=🍬" }
        ],
        rating: 4.8,
        resenas: 25,
        telefono: "3001234567",
        instagram: "@dulcessena",
        email: "dulcessena@sena.edu.co"
    },
    {
        id: 2,
        nombre: "Artesanías Creativas",
        categoria: "Artesanías",
        descripcion: "Productos hechos a mano con materiales naturales. Bolsos, bisutería y decoración del hogar con diseños únicos y exclusivos.",
        logo: "https://placehold.co/200x200/E67E22/white?text=AC",
        productos: [
            { nombre: "Bolso tejido",   imagen: "https://placehold.co/300x300/DEB887/333?text=👜" },
            { nombre: "Collar macramé", imagen: "https://placehold.co/300x300/C39BD3/white?text=📿" }
        ],
        rating: 4.7,
        resenas: 18,
        telefono: "3109876543",
        instagram: "@artesaniascreativas",
        email: ""
    },
    {
        id: 3,
        nombre: "Café Express",
        categoria: "Alimentos",
        descripcion: "Café de origen colombiano de alta montaña. Granos seleccionados a mano, tostión artesanal y entrega a domicilio.",
        logo: "https://placehold.co/200x200/6F4E37/white?text=CE",
        productos: [
            { nombre: "Café molido 250g",  imagen: "https://placehold.co/300x300/6F4E37/white?text=☕" },
            { nombre: "Café en grano 500g", imagen: "https://placehold.co/300x300/4A2C17/white?text=🫘" },
            { nombre: "Drip bag x10",      imagen: "https://placehold.co/300x300/A0522D/white?text=🎁" }
        ],
        rating: 4.5,
        resenas: 32,
        telefono: "3205556677",
        instagram: "@cafeexpress",
        email: "cafeexpress@gmail.com"
    },
    {
        id: 4,
        nombre: "Artesanías",
        categoria: "Artesanías",
        descripcion: "Artesanías originales inspiradas en la cultura colombiana. Cerámicas, tejidos y pinturas que cuentan nuestra historia.",
        logo: "https://placehold.co/200x200/8E44AD/white?text=AR",
        productos: [
            { nombre: "Mochila wayuu",  imagen: "https://placehold.co/300x300/FF6B6B/white?text=🎒" },
            { nombre: "Cerámica raku",  imagen: "https://placehold.co/300x300/95A5A6/white?text=🏺" }
        ],
        rating: 4.3,
        resenas: 11,
        telefono: "3154443322",
        instagram: "@artesaniascol",
        email: ""
    },
    {
        id: 5,
        nombre: "Tech Aprendices",
        categoria: "Tecnología",
        descripcion: "Servicios de desarrollo web, diseño de apps y soporte técnico a precios accesibles. Soluciones digitales para tu negocio.",
        logo: "https://placehold.co/200x200/2980B9/white?text=TA",
        productos: [
            { nombre: "Web básica",    imagen: "https://placehold.co/300x300/3498DB/white?text=💻" },
            { nombre: "App móvil",     imagen: "https://placehold.co/300x300/1ABC9C/white?text=📱" },
            { nombre: "Logo + Marca",  imagen: "https://placehold.co/300x300/9B59B6/white?text=🎨" }
        ],
        rating: 4.9,
        resenas: 7,
        telefono: "3001112233",
        instagram: "@techaprendices",
        email: "techaprendices@sena.edu.co"
    },
    {
        id: 6,
        nombre: "Costura y Moda",
        categoria: "Moda",
        descripcion: "Diseño y confección de ropa a medida. Trajes, uniformes y prendas casuales con acabados de alta calidad.",
        logo: "https://placehold.co/200x200/E91E63/white?text=CM",
        productos: [
            { nombre: "Vestido formal",  imagen: "https://placehold.co/300x300/F48FB1/333?text=👗" },
            { nombre: "Camisa a medida", imagen: "https://placehold.co/300x300/CE93D8/333?text=👔" }
        ],
        rating: 4.6,
        resenas: 14,
        telefono: "3188889900",
        instagram: "@costuraymoda",
        email: ""
    }
];

/* ── INICIALIZAR ── */
function inicializarEmprendimientos() {
    if (!localStorage.getItem(KEY_EMP)) {
        localStorage.setItem(KEY_EMP, JSON.stringify(EMPRENDIMIENTOS_EJEMPLO));
    }
}

/* ── OBTENER TODOS ── */
function obtenerEmprendimientos() {
    return JSON.parse(localStorage.getItem(KEY_EMP)) || [];
}

/* ── OBTENER UNO ── */
function obtenerEmprendimiento(id) {
    return obtenerEmprendimientos().find(e => e.id == id);
}

/* ── BUSCAR ── */
function buscarEmprendimientos(texto) {
    const t = texto.toLowerCase().trim();
    if (!t) return obtenerEmprendimientos();
    return obtenerEmprendimientos().filter(e =>
        e.nombre.toLowerCase().includes(t) ||
        e.categoria.toLowerCase().includes(t) ||
        e.descripcion.toLowerCase().includes(t)
    );
}

/* ── FILTRAR POR CATEGORÍA ── */
function filtrarPorCategoria(categoria) {
    if (!categoria || categoria === "Todos") return obtenerEmprendimientos();
    return obtenerEmprendimientos().filter(e => e.categoria === categoria);
}

/* ── OBTENER CATEGORÍAS ── */
function obtenerCategorias() {
    const cats = obtenerEmprendimientos().map(e => e.categoria);
    return [...new Set(cats)];
}
