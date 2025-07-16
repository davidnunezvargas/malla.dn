const cursos = [
  {
    semestre: 1,
    cursos: [
      { sigla: 'EG1', nombre: 'Humanidades 1', creditos: 6, requisitos: [] },
      { sigla: 'DN0101', nombre: 'Intro a admin', creditos: 3, requisitos: [] },
      { sigla: 'EGA', nombre: 'Artística', creditos: 2, requisitos: [] },
      { sigla: 'MA0001', nombre: 'Precálculo', creditos: 0, requisitos: [] },
      { sigla: 'RP1', nombre: 'Repertorio', creditos: 3, requisitos: [] },
      { sigla: 'XE0156', nombre: 'Intro a la economía', creditos: 4, requisitos: [] },
    ],
  },
  {
    semestre: 2,
    cursos: [
      { sigla: 'EG2', nombre: 'Humanidades 2', creditos: 6, requisitos: ['EG1'] },
      { sigla: 'DN0102', nombre: 'Ofimáticas', creditos: 3, requisitos: [] },
      { sigla: 'EF1', nombre: 'Deportiva', creditos: 0, requisitos: [] },
      { sigla: 'MA1021', nombre: 'Cálculo 1', creditos: 4, requisitos: ['MA0001'] },
      { sigla: 'PC0200', nombre: 'Conta básica', creditos: 4, requisitos: ['DN0101'] },
    ],
  },
  {
    semestre: 3,
    cursos: [
      { sigla: 'DN0103', nombre: 'Admin de proyectos', creditos: 3, requisitos: ['DN0102'] },
      { sigla: 'MA1022', nombre: 'Cálculo 2', creditos: 4, requisitos: ['MA1021'] },
      { sigla: 'PC0202', nombre: 'Conta intermedia 1', creditos: 3, requisitos: ['PC0200'] },
      { sigla: 'PC0240', nombre: 'Mate financiera', creditos: 3, requisitos: ['MA1021'] },
      { sigla: 'XS0276', nombre: 'Estadística 1', creditos: 4, requisitos: ['MA1021'] },
    ],
  },
  {
    semestre: 4,
    cursos: [
      { sigla: 'DN0104', nombre: 'Legis empresarial', creditos: 3, requisitos: ['DN0101'] },
      { sigla: 'DN0123', nombre: 'Metodología investigación', creditos: 3, requisitos: ['XS0276'] },
      { sigla: 'DN0340', nombre: 'Admin financiera 1', creditos: 3, requisitos: ['PC0200', 'PC0240'] },
      { sigla: 'PC0304', nombre: 'Conta intermedia 2', creditos: 3, requisitos: ['PC0202', 'PC0240'] },
      { sigla: 'SR1', nombre: 'Seminario 1', creditos: 2, requisitos: ['EG2'] },
      { sigla: 'XS0277', nombre: 'Estadística 2', creditos: 4, requisitos: ['XS0276'] },
    ],
  },
  {
    semestre: 5,
    cursos: [
      { sigla: 'DN0105', nombre: 'Métodos 1', creditos: 3, requisitos: ['DN0340', 'XS0277'] },
      { sigla: 'DN0107', nombre: 'Comercio internacional', creditos: 3, requisitos: ['XE0156', 'XS0276'] },
      { sigla: 'DN0202', nombre: 'Principios de gerencia', creditos: 3, requisitos: ['DN0340'] },
      { sigla: 'DN0320', nombre: 'Mercadeo', creditos: 3, requisitos: ['PC0200', 'XS0276'] },
      { sigla: 'DN0341', nombre: 'Admin financiera 2', creditos: 3, requisitos: ['DN0340', 'XS0277'] },
      { sigla: 'PC0261', nombre: 'Legis comercial', creditos: 3, requisitos: ['DN0104'] },
    ],
  },
  {
    semestre: 6,
    cursos: [
      { sigla: 'DN0106', nombre: 'Gestión del talento', creditos: 3, requisitos: ['DN0202'] },
      { sigla: 'DN0110', nombre: 'Métodos 2', creditos: 3, requisitos: ['DN0105'] },
      { sigla: 'DN0321', nombre: 'Publi y promoción', creditos: 3, requisitos: ['DN0320'] },
      { sigla: 'DN0442', nombre: 'Admin financiera 3', creditos: 3, requisitos: ['DN0341'] },
      { sigla: 'PC0260', nombre: 'Legis laboral', creditos: 3, requisitos: ['PC0261'] },
      { sigla: 'SR2', nombre: 'Seminario 2', creditos: 2, requisitos: ['SR1'] },
    ],
  },
  {
    semestre: 7,
    cursos: [
      { sigla: 'DN0304', nombre: 'Liderazgo gerencial', creditos: 3, requisitos: ['DN0106'] },
      { sigla: 'DN0405', nombre: 'Creación de empresas', creditos: 3, requisitos: ['DN0106'] },
      { sigla: 'DN0423', nombre: 'Investigación de mercados', creditos: 3, requisitos: ['DN0321'] },
      { sigla: 'DN0496', nombre: 'Gerencia de operaciones', creditos: 3, requisitos: ['DN0110'] },
      { sigla: 'PC0344', nombre: 'Formulación 1', creditos: 3, requisitos: ['DN0341'] },
      { sigla: 'PC0462', nombre: 'Legis tributaria', creditos: 3, requisitos: ['PC0260', 'PC0304'] },
    ],
  },
  {
    semestre: 8,
    cursos: [
      { sigla: 'DN0108', nombre: 'Mercados bursátiles', creditos: 4, requisitos: ['PC0344'] },
      { sigla: 'DN0109', nombre: 'Auditoría financiera', creditos: 3, requisitos: ['DN0442', 'PC0304'] },
      { sigla: 'DN0111', nombre: 'Gestión de la innovación', creditos: 3, requisitos: ['DN0106'] },
      { sigla: 'DN0112', nombre: 'Gerencia de calidad', creditos: 3, requisitos: ['DN0496'] },
      { sigla: 'DN0322', nombre: 'Ventas y distribución', creditos: 3, requisitos: ['DN0423'] },
    ],
  },
];

const aprobados = new Set();

function calcularAvance() {
  let totalCred = 0;
  let completadoCred = 0;

  cursos.forEach(col => {
    col.cursos.forEach(c => {
      totalCred += c.creditos;
      if (aprobados.has(c.sigla)) {
        completadoCred += c.creditos;
      }
    });
  });

  const porcentaje = Math.round((completadoCred / totalCred) * 100);
  document.getElementById('avance').innerText = `Avance para TCU: ${porcentaje}%`;
}

function renderMalla() {
  const tabla = document.getElementById('tabla-malla');
  tabla.innerHTML = '';

  cursos.forEach(col => {
    const columna = document.createElement('div');
    columna.className = 'columna-semestre';

    const titulo = document.createElement('h2');
    titulo.textContent = `Semestre ${col.semestre}`;
    columna.appendChild(titulo);

    col.cursos.forEach(curso => {
      const div = document.createElement('div');
      div.className = 'curso';
      div.id = curso.sigla;
      div.innerHTML = `<strong>${curso.sigla}</strong><br>${curso.nombre}<br><small>${curso.creditos} créditos</small>`;

      const completado = aprobados.has(curso.sigla);
      const desbloqueado = curso.requisitos.every(req => aprobados.has(req));

      if (!desbloqueado && !completado) div.classList.add('locked');
      if (completado) div.classList.add('completed');

      div.onclick = () => {
        if (!desbloqueado && !completado) return;

        if (completado) {
          aprobados.delete(curso.sigla);
        } else {
          aprobados.add(curso.sigla);
        }

        renderMalla();
        calcularAvance();
      };

      columna.appendChild(div);
    });

    tabla.appendChild(columna);
  });

  calcularAvance();
}

document.addEventListener('DOMContentLoaded', renderMalla);
