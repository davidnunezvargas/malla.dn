let aprobados = new Set(JSON.parse(localStorage.getItem('aprobados') || '[]'));

const cursos = [
];

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
  document.getElementById('avance').innerText = `Avance: ${porcentaje}%`;
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
        localStorage.setItem('aprobados', JSON.stringify([...aprobados]));
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
