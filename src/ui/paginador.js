function crearItemPaginardor(nombre, url = '#') {
  const $item = document.createElement('li');
  $item.className = 'page-item';
  const $link = document.createElement('a');
  $link.setAttribute('href', url);
  $link.className = 'page-link';
  $link.innerText = nombre;
  $link.dataset.pagina = nombre;

  $item.appendChild($link);

  return $item;
}

function manejarCambioPagina(e, callbackFunctionPaginador = () => {}) {
  e.preventDefault();
  const { target } = e;
  const href = target.getAttribute('href');
  let numeroPagina;
  const { pagina } = target.dataset;
  if (href === '#') {
    numeroPagina = Number(pagina);
    callbackFunctionPaginador(numeroPagina);
  }
  if (href === null) {
    console.log('xd');
  } else {
    callbackFunctionPaginador(href);
  }
}

export default function configurarPaginador(
  totalPaginas,
  paginaActual,
  urlSiguiente,
  urlAnterior,
  callbackFunctionPaginador = () => {},
) {
  const $paginador = document.querySelector('#paginador');
  $paginador.innerHTML = '';
  const $paginaAnterior = crearItemPaginardor('Anterior', urlAnterior);
  if (urlAnterior) {
    $paginaAnterior.classList.remove('disabled');
  } else {
    $paginaAnterior.classList.add('disabled');
  }
  $paginador.appendChild($paginaAnterior);

  const $paginaSiguiente = crearItemPaginardor('Sguiente', urlSiguiente);
  if (urlSiguiente) {
    $paginaSiguiente.classList.remove('disabled');
  } else {
    $paginaSiguiente.classList.add('disabled');
  }
  $paginador.appendChild($paginaSiguiente);

  $paginador.onclick = (e) => {
    manejarCambioPagina(e, callbackFunctionPaginador);
  };
}
