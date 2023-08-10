//BOTONES//
const btnBalance = document.getElementById("btnBalance");
const btnAhorradas = document.getElementById("btn-ahorradas");
const btnCategorias = document.getElementById("btnCategorias");
const btnReportes = document.getElementById("btnReportes");
const btnNuevaOperacion = document.getElementById("btn-nueva-operacion");
const btnOcultarFiltros = document.getElementById("btn-ocultar-filtros");
const btnMostrarFiltros = document.getElementById("btn-mostrar-filtros");
const btnAgregar = document.getElementById("agregar-btn");
// const editarOperacion = document.getElementById("editarOperacion");
const eliminarOperacion = document.getElementById("eliminarOperacion");
const btnAgregarCategoria = document.getElementById("btn-agregar-categoria");
const btnEditarCategoria = document.getElementById("btn-editar-categoria");

// INPUTS //
const inputDescripcion = document.getElementById("descripcion");
const inputMonto = document.getElementById("monto");
const inputTipo = document.getElementById("tipo");
const selectCategoriaOperacion = document.getElementById(
  "selectCategoriaOperacion"
);
const inputFecha = document.getElementById("fecha-input");
const acciones = document.getElementById("acciones");
const inputEditar = document.getElementById("editar-categoria-input");

//editar operacion
const descripcionEditar = document.getElementById("descripcion-editar");
const montoEditar = document.getElementById("monto-editar");
const tipoEditar = document.getElementById("tipo-editar");
const categoriaEditar = document.getElementById("categoria-editar");
const fechaEditar = document.getElementById("fecha-editar");
const btnEditarOperacion = document.getElementById("btn-editar-operacion");
const btnCancelarOperacion = document.getElementById("btn-cancelar-operacion");

//SECCIONES//
const balance = document.getElementById("seccion-balance"); //TRAIGO SECCION BALANCE
const categorias = document.getElementById("seccion-categorias"); //TRAIGO SECCION CATEGORIAS
const reportes = document.getElementById("seccion-reportes"); //TRAIGO SECCION REPORTES
const contenedorReportes = document.getElementById("contenedor-reportes");
const operacionesInsuficientes = document.getElementById(
  "operaciones-insuficientes"
);

const seccionOperacion = document.getElementById("seccion-operacion"); //TRAIGO FORMULARIO OPERACIONES
const filtros = document.getElementById("filtros");
const seccionEditarOperacion = document.getElementById(
  "seccion-editar-operacion"
);
const editarCategoriaSeccion = document.getElementById(
  "seccion-editar-categorias"
);

btnBalance.addEventListener("click", () => {
  balance.classList.remove("oculto");
  categorias.classList.add("oculto");
  btnBalance.classList.add("active");
  btnCategorias.classList.remove("active");
  btnReportes.classList.remove("active");
  editarCategoriaSeccion.classList.add("oculto");
  reportes.classList.add("oculto");
  seccionOperacion.classList.add("oculto");
});

btnAhorradas.addEventListener("click", () => {
  balance.classList.remove("oculto");
  categorias.classList.add("oculto");
  reportes.classList.add("oculto");
  btnBalance.classList.add("active");
  btnReportes.classList.remove("active");
  btnCategorias.classList.remove("active");
  editarCategoriaSeccion.classList.add("oculto");
  seccionOperacion.classList.add("oculto");
});

btnCategorias.addEventListener("click", () => {
  balance.classList.add("oculto");
  btnBalance.classList.remove("active");
  btnCategorias.classList.add("active");
  btnReportes.classList.remove("active");
  categorias.classList.remove("oculto");
  reportes.classList.add("oculto");
});

btnNuevaOperacion.addEventListener("click", () => {
  seccionOperacion.classList.remove("oculto");
  balance.classList.add("oculto");
  categorias.classList.add("oculto");
  reportes.classList.add("oculto");
}); 

////////////////////////////////////////////////////////////////////////////////////////////////////
//FILTROS//
////////////////////////////////////////////////////////////////////////////////////////////////////

//OCULTAR Y MOSTRAR FILTROS

btnOcultarFiltros.addEventListener("click", () => {
  filtros.classList.add("oculto");
  btnMostrarFiltros.classList.remove("oculto");
  btnOcultarFiltros.classList.add("oculto");
});

btnMostrarFiltros.addEventListener("click", () => {
  filtros.classList.remove("oculto");
  btnMostrarFiltros.classList.add("oculto");
  btnOcultarFiltros.classList.remove("oculto");
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// SECCION CATEGORIAS
////////////////////////////////////////////////////////////////////////////////////////////////////

let arrayCategorias = JSON.parse(localStorage.getItem("categorias")) || [
  {
    nombre: "Comida",
    id: uuidv4(),
  },
  {
    nombre: "Servicios",
    id: uuidv4(),
  },
  {
    nombre: "Salidas",
    id: uuidv4(),
  },
  {
    nombre: "Educacion",
    id: uuidv4(),
  },
  {
    nombre: "Transporte",
    id: uuidv4(),
  },
  {
    nombre: "Trabajo",
    id: uuidv4(),
  },
];

//FUNCION QUE AGREGA LAS CATEGORIAS (ARREGLO DE CATEGORIAS) A LOS SELECT
const selects = document.getElementsByClassName("select-categorias");
const generarCategorias = () => {
  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    select.innerHTML = "";
    if (select.classList.contains("filtro-categorias")) {
      select.innerHTML = '<option value="todas" selected>Todas</option>';
    }
    arrayCategorias.forEach((categoria) => {
      select.innerHTML += `<option value=${categoria.nombre}>${categoria.nombre}</option>`;
    });
  }
};
generarCategorias();

//FUNCION QUE PINTA LAS CATEGORIAS (ARR DE CATEGORIAS) EN LA SECCION DE CATEGORIAS, ABAJO DE TODAS LAS OTRAS CATEGORIAS CON SU BOT'ON EDITAR Y ELIMINAR
const pintarCategorias = (arr) => {
  document.getElementById("categorias").innerHTML = "";
  arr.forEach((categoria) => {
    document.getElementById("categorias").innerHTML += `
    <div class="container text-start lista-categorias">
      <div class="row align-items-start">
        <div class="col my-1">
        <span class="badge text-bg-primary">${categoria.nombre}</span>
      </div>
      <div class="col text-end">
        <a class="editar" data-id=${categoria.id} href="#">Editar</a>
        <a class="eliminar" data-id=${categoria.id} href="#">Eliminar</a>
      </div>
   </div>`;
  });

  localStorage.setItem("categorias", JSON.stringify(arrayCategorias));

  //ELIMINAR CATEGORIA
  const btnsEliminar = document.querySelectorAll(".eliminar");

  btnsEliminar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const arrayLimpio = arrayCategorias.filter(
        (arr) => arr.id !== e.target.dataset.id
      );
      localStorage.setItem("categorias", JSON.stringify(arrayLimpio));
      arrayCategorias = JSON.parse(localStorage.getItem("categorias"));
      pintarCategorias(arrayCategorias);
      generarCategorias();
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //EDITAR CATEGORIA
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const btnsEditar = document.querySelectorAll(".editar");
  const btnCancelar = document.getElementById("cancelar");

  btnsEditar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const arrayEditado = arrayCategorias.filter(
        (categoria) => categoria.id == e.target.dataset.id
      );
      editarCategoria(arrayEditado);

      btnEditarCategoria.addEventListener("click", () => {
        arrayEditado[0].nombre = inputEditar.value;
        categorias.classList.remove("oculto");
        editarCategoriaSeccion.classList.add("oculto");
        pintarCategorias(arrayCategorias);
        generarCategorias();
      });

      btnCancelar.addEventListener("click", () => {
        categorias.classList.remove("oculto");
        editarCategoriaSeccion.classList.add("oculto");
      });
    });
  });
};

const editarCategoria = (arr) => {
  const { nombre } = arr[0];

  categorias.classList.add("oculto");
  editarCategoriaSeccion.classList.remove("oculto");
  inputEditar.value = nombre;
};

pintarCategorias(arrayCategorias);

//FUNCION QUE TOMA DEL INPUT LA NUEVA CATEGORIA INGRESADA POR EL USUARIO, LE PONE UN ID, Y LA TIENE QUE SUBIR AL ARREGLO DE CATEGORIAS, 
let inputCategoria = document.getElementById("nueva-categoria-input");

const listaCategorias = document.getElementById("categorias");

////////////////////////////////////////////////////////////////////////////////////////////////////
///FUNCION QUE PINTA LAS NUEVAS CATEGORIAS
////////////////////////////////////////////////////////////////////////////////////////////////////
btnAgregarCategoria.addEventListener("click", () => {
  const nuevaCategoria = {
    nombre: inputCategoria.value,
    id: uuidv4(),
  };
  arrayCategorias.push(nuevaCategoria);

  inputCategoria.value = "";

  listaCategorias.innerHTML += `
  <div class="container text-start lista-categorias">
      <div class="row align-items-start">
        <div class="col my-1">
        <span class="badge text-bg-primary">${nuevaCategoria.nombre}</span>
      </div>
      <div class="col text-end">
        <a class="editar" data-id=${nuevaCategoria.id} href="#">Editar</a>
        <a class="eliminar" data-id=${nuevaCategoria.id} href="#">Eliminar</a>
      </div>
   </div>
`;
  localStorage.setItem("categorias", JSON.stringify(arrayCategorias));
  generarCategorias();
  pintarCategorias(arrayCategorias);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
// NUEVA OPERACION //
////////////////////////////////////////////////////////////////////////////////////////////////////

let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

// const operaciones = [];

const mostrarOperaciones = (arr) => {
  if (!arr.length) {
    document.getElementById("con-operaciones").classList.add("d-none");
  } else {
    document.getElementById("con-operaciones").classList.remove("d-none");
    document.getElementById("sin-operaciones").classList.add("d-none");
  }
};
mostrarOperaciones(operaciones);

btnAgregar.addEventListener("click", () => {
  // VALIDACION
  const toastLiveExample = document.getElementById("liveToast");

  if (inputDescripcion.value.trim().length === 0 || monto.value < 0) {
    const toast = new bootstrap.Toast(toastLiveExample);

    toast.show();
    return;
  }

  const operacion = {
    id: uuidv4(),
    descripcion: inputDescripcion.value,
    monto: inputMonto.value,
    tipo: inputTipo.value,
    categorias: selectCategoriaOperacion.value,
    fecha: inputFecha.value,
  };

  operaciones.push(operacion);
  seccionOperacion.classList.add("oculto");
  balance.classList.remove("oculto");
  inputDescripcion.value = "";
  inputMonto.value = 0;
  inputTipo.value = "";
  selectCategoriaOperacion.value = "Servicios";
  inputTipo.value = "ganancia";
  inputFecha.valueAsDate = new Date();
  mostrarOperaciones(operaciones);

  localStorage.setItem("operaciones", JSON.stringify(operaciones));

  pintarOperaciones(operaciones);
});

const btnCancelarCargarOperacion = document.getElementById(
  "btn-cancelar-cargar-operacion"
);
btnCancelarCargarOperacion.addEventListener("click", () => {
  seccionEditarOperacion.classList.add("oculto");
  balance.classList.remove("oculto");
});

const pintarOperaciones = (arr) => {
  document.getElementById("operaciones").innerHTML = ""; //limpiamos operaciones y muestra img del inicio
  let str = "";
  arr.forEach((operacion) => {
    const { id, descripcion, categorias, fecha, monto, tipo } = operacion;

    console.log(fecha);
    str = str += ` <div class="row align-items-start my-2" >
          <div class="col">
            ${descripcion}
          </div>
          <div class="col">
            <span class="badge text-bg-primary">${categorias}</span>
          </div>
          <div class="col">
            ${fecha}
          </div>
          <div class="col ${tipo === "ganancia" ? "success" : "danger"}" >
            $${monto}
          </div>
          <div class="col">
            <a class='editar-btn' data-id=${id}>Editar</a>
            </br>
            <a class="eliminar-btn" data-id=${id}>Eliminar</a>
          </div>
      </div>
      `;
    document.getElementById("operaciones").innerHTML = str;

    //BTNS ELIMINAR/EDITAR OPERACIONES

    const eliminarBtn = document.querySelectorAll(".eliminar-btn");

    eliminarBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const eliminar = operaciones.filter(
          (operacion) => operacion.id !== e.target.dataset.id
        ); //omitimos traer el que estamos eliminando
        localStorage.setItem("operaciones", JSON.stringify(eliminar));
        operaciones = JSON.parse(localStorage.getItem("operaciones"));
        pintarOperaciones(operaciones);
        mostrarOperaciones(operaciones);
      });
    });
  });
  //PINTAR OPERACIONES Y ELIMINAR DEBEN HACER LA MISMA FUNCION QUE ACTUALIZAR/PINTAR EL BALANCE SIN 'REFRESCAR',
  const editarBtn = document.querySelectorAll(".editar-btn");

  editarBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const editar = operaciones.filter(
        (operacion) => operacion.id === e.target.dataset.id
      );
      editarBtnOperacion(editar);
      btnEditarOperacion.addEventListener("click", () => {
        const copiaEditar = { ...editar[0] };
        copiaEditar.descripcion = descripcionEditar.value;
        copiaEditar.monto = montoEditar.value;
        copiaEditar.tipo = tipoEditar.value;
        copiaEditar.categorias = categoriaEditar.value;
        copiaEditar.fecha = fechaEditar.value;
        const operacionEditada = operaciones.map((operacion) =>
          operacion.id === copiaEditar.id ? copiaEditar : operacion
        );
        localStorage.setItem("operaciones", JSON.stringify(operacionEditada));
        operaciones = JSON.parse(localStorage.getItem("operaciones"));
        pintarOperaciones(operaciones);
      });
    });
    btnCancelarOperacion.addEventListener("click", () => {
      seccionEditarOperacion.classList.add("oculto");
      balance.classList.remove("oculto");
    });
  });
  pintarEnBalance(operaciones);
};

//BTN EDITAR OPERACIONES

const editarBtnOperacion = (arr) => {
  const { descripcion, monto, tipo, categorias, fecha } = arr[0];
  balance.classList.add("oculto");
  seccionEditarOperacion.classList.remove("oculto");
  descripcionEditar.value = descripcion;
  montoEditar.value = monto;
  tipoEditar.value = tipo;
  categoriaEditar.value = categorias;
  fechaEditar.value = fecha;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// FILTROS
////////////////////////////////////////////////////////////////////////////////////////////////////


const filtrosAcumulados = (e) => {
  const porCategoria = filtroCate
}





////////////////////////////////////////////////////////////////////////////////////////////////////

//FILTRO por tipo todos, gastos y ganacias

const selectTipoFiltros = document.getElementById("selectTipoFiltros");

selectTipoFiltros.addEventListener("change", (e) => {
  if (e.target.value !== "todos") {
    const porTipo = operaciones.filter(
      (operaciones) => operaciones.tipo === e.target.value
    );
    localStorage.setItem("operaciones", JSON.stringify(porTipo));
    pintarOperaciones(porTipo);
  } else {
    pintarOperaciones(operaciones);
  }
});

//Filtro por categoria

const selectCategoriaFiltros = document.getElementById(
  "selectCategoriaFiltros"
);

selectCategoriaFiltros.addEventListener("change", (e) => {
  console.log(e.target.value);
  if (e.target.value !== "todas") {
    const porCategoria = operaciones.filter(
      (operaciones) => operaciones.categorias === e.target.value
    );
    localStorage.setItem("operaciones", JSON.stringify(porCategoria));
    pintarOperaciones(porCategoria);
  } else {
    pintarOperaciones(operaciones);
  }
  //los values tiene que estar escritos igual
});

//FILTRO POR FECHA (DESDE TAL DIA EN ADELANTE)

const ordenarPorFecha = document.getElementById("por-fecha");

ordenarPorFecha.addEventListener("change", (e) => {
  // console.log(e.target.value);
  // console.log(operaciones[0].fecha);
  const operacionesFiltradasPorFecha = operaciones.filter(
    (operacion) => new Date(operacion.fecha) >= new Date(e.target.value)
  );
  // console.log(operacionesFiltradasPorFecha);
  pintarOperaciones(operacionesFiltradasPorFecha);
});

//ORDENAR POR

const ordenarPor = document.getElementById("ordenar-por");

ordenarPor.addEventListener("change", () => {
  //MAS RECIENTE
  if (ordenarPor.value === "mas-reciente") {
    operaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }
  pintarOperaciones(operaciones);

  //MENOS RECIENTE
  if (ordenarPor.value === "menos-reciente") {
    operaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }
  pintarOperaciones(operaciones);

  //MAYOR MONTO
  if (ordenarPor.value === "mayor-monto") {
    operaciones.sort((a, b) => {
      if (Number(a.monto) > Number(b.monto)) {
        return -1;
      }
      if (Number(a.monto) < Number(b.monto)) return 1;
    });
  }
  pintarOperaciones(operaciones);

  //MENOR MONTO
  if (ordenarPor.value === "menor-monto") {
    operaciones.sort((a, b) => {
      if (Number(a.monto) < Number(b.monto)) {
        return -1;
      }
      if (Number(a.monto) > Number(b.monto)) return 1;
    });
  }
  pintarOperaciones(operaciones);

  //A/Z

  if (ordenarPor.value === "a-z") {
    operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
        return -1;
      }
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) return 1;
    });
  }
  pintarOperaciones(operaciones);

  //Z/A

  if (ordenarPor.value === "z-a") {
    operaciones.sort((a, b) => {
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
        return -1;
      }
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) return 1;
    });
  }
  pintarOperaciones(operaciones);
});



////////////////////////////////////////////////////////////
////////////SECCION BALANCE//////////
////////////////////////////////////////////////////////////

////////////FILTRAR TOTAL DE GANANCIAS//////////
const totalGananciasBalance = (arr) => {
  let resultadoGanancias = arr
    .filter((operacion) => operacion.tipo === "ganancia")
    .reduce((prev, current) => prev + Number(current.monto), 0);
  return resultadoGanancias;
};

////////////FILTRAR TOTAL DE GASTOS//////////
const totalGastosBalance = (arr) => {
  let resultadoGastos = arr
    .filter((operacion) => operacion.tipo === "gasto")
    .reduce((prev, current) => prev + Number(current.monto), 0);
  return resultadoGastos;
};

///////////IMPRIMIR RESULTADOS EN SECCION BALANCE//////////////////
const pintarEnBalance = (arr) => {
  const totalBalance = totalGananciasBalance(arr) - totalGastosBalance(arr);
  //let str = ''
  //for (let)
  let str = `
            <tbody>
              <tr>
                <td>Ganancias</td>
                <td class="text-success">+$${totalGananciasBalance(arr)}</td>
              </tr>
              <tr>
                <td>Gastos</td>
                <td class="text-danger">+$${totalGastosBalance(arr)}</td>
              </tr>
              <tr>
                <th>Total</th>
                <th>$${Math.abs(totalBalance)}</th>
              </tr>
            </tbody>`;

  document.getElementById("balance").innerHTML = str;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//REPORTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//REPORTES
btnReportes.addEventListener("click", () => {
  balance.classList.add("oculto");
  categorias.classList.add("oculto");
  reportes.classList.remove("oculto");
  btnBalance.classList.remove("active");
  btnCategorias.classList.remove("active");
  btnReportes.classList.add("active");
  if (!operaciones.length) {
    operacionesInsuficientes.classList.remove("oculto");
    contenedorReportes.classList.add("oculto");
  } else {
    operacionesInsuficientes.classList.add("oculto");
    contenedorReportes.classList.remove("oculto");
  }
  totalPorMes(operaciones); //hago que se active cuando el usuario le de click al btn reportes
  totalPorCategoria(operaciones, arrayCategorias);
  categoriaConMayorBalance(operaciones, arrayCategorias);
  categoriaConMayorGanacia(operaciones);
  categoriaConMayorGasto(operaciones);
  mesConMayorGanancia(operaciones);
  mesConMayorGasto(operaciones)
});

//RESUMEN
//CATEGORIA CON MAYOR GANANCIA
const categoriaConMayorGanacia = (operaciones) => {
  const mayorGanancia = operaciones
    .filter((operaciones) => operaciones.tipo === "ganancia")
    .sort((a, b) => b.monto - a.monto);
  if (mayorGanancia.length > 0) {
    document.getElementById("categoria-mayor-ganancia").innerHTML = 
    `
    <div class="row align-items-start m-4" >
      <div class="col w-25">
        Categoria con Mayor Ganancia
      </div>
      <div class="col text-end">
        <span class="badge text-bg-primary">${mayorGanancia[0].categorias}</span>
      </div>
      <div class="col text-end text-success fw-bold">
        ${mayorGanancia[0].monto}
      </div>
    </div>
    `;
  }
};

//CATEGORIA CON MAYOR GASTO
const categoriaConMayorGasto = (operaciones) => {
  const mayorGasto = operaciones
    .filter((operaciones) => operaciones.tipo === "gasto")
    .sort((a, b) => b.monto - a.monto);
  if (mayorGasto.length > 0) {
    document.getElementById("categoria-mayor-gasto").innerHTML = 
    `
    <div class="row align-items-start m-4" >
      <div class="col w-25">
        Categoria con Mayor Gasto
      </div>
      <div class="col text-end">
        <span class="badge text-bg-primary">${mayorGasto[0].categorias}</span>
      </div>
      <div class="col text-end text-danger fw-bold">
        ${mayorGasto[0].monto}
      </div>
    </div>
    `;
  }
};

//CATEGORIA CON MAYOR BALANCE
const categoriaConMayorBalance = (operaciones, arrayCategorias) => {
  document.getElementById("categoria-mayor-balance").innerHTML = "";
  let str = "";
  // const conBalance = arrayCategorias.map(categoria => {

  const conBalance = arrayCategorias.map((arrayCategorias) => {
    const porCategoria = operaciones.filter(
      (operacion) => operacion.categorias === arrayCategorias.nombre
    );
    console.log(porCategoria); //tira un arr con obj de las categorias

    const porCategoriaGanancia = porCategoria
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0);

    const porCategoriaGasto = porCategoria
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((count, current) => count + Number(current.monto), 0);

    return {
      ...arrayCategorias,
      balance: porCategoriaGanancia - porCategoriaGasto,
    };
  });

  const resultadoCategoriaMayorGanancia = conBalance.sort(
    (a, b) => b.balance - a.balance
  );
  console.log(resultadoCategoriaMayorGanancia[0]);
  const resultado = resultadoCategoriaMayorGanancia[0];

  str += `
      
      <div class="row align-items-start m-4" >
          <div class="col w-25">
            Categoria con Mayor Balance
          </div>
          <div class="col text-end">
            <span class="badge text-bg-primary">${resultado.nombre}</span>
          </div>
          <div class="col text-end fw-bold">
            ${resultado.balance}
          </div>
      </div>
    `;
  document.getElementById("categoria-mayor-balance").innerHTML = str;
};

//MES CON MAYOR GANANCIA

let totalesPorMesesGanancia = []
  
const mesConMayorGanancia = (arr) => {

  const arrMesUnico = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[1])),
  ].sort(); 
  console.log(arrMesUnico);

  const arrAnio = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[0])),
  ].sort();

  for (let i = 0; i < arrMesUnico.length; i++) {
    const operacionesMesUnico = arr.filter(
      (operacion) => operacion.fecha.split("-")[1] === arrMesUnico[i]
    ); 
    console.log(operacionesMesUnico)

    const porGanancia = operacionesMesUnico
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0); 
    console.log(porGanancia);

    const nuevoObjeto = {
    mes: arrMesUnico[i],
    anio: arrAnio,
    ganancia: porGanancia,
  };
  totalesPorMesesGanancia.push(nuevoObjeto);
  // console.log(totalesPorMeses)

  const resultadoMesMayorGanancia = totalesPorMesesGanancia.sort(
    (a, b) => b.ganancia - a.ganancia
  );

 document.getElementById("mes-mayor-ganancia").innerHTML = "";
    let str = "";
        str += `
      <div class="row align-items-start m-4" >
        <div class="col w-25">
          Mes con Mayor Ganancia
        </div>  
        <div class="col text-end">
          ${resultadoMesMayorGanancia[0].mes}/${resultadoMesMayorGanancia[0].anio}
        </div>
        <div class="col text-end">
          <span class="text-success fw-bold">${resultadoMesMayorGanancia[0].ganancia}</span>
        </div>
      </div>
      `;
    document.getElementById("mes-mayor-ganancia").innerHTML = str;
  
  }
};

//MES CON MAYOR GASTO
let totalesPorMesesGasto = []

const mesConMayorGasto = (arr) => {

  const arrMesUnico = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[1])),
  ].sort(); 
  console.log(arrMesUnico);

  const arrAnio = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[0])),
  ].sort();

  for (let i = 0; i < arrMesUnico.length; i++) {
    const operacionesMesUnico = arr.filter(
      (operacion) => operacion.fecha.split("-")[1] === arrMesUnico[i]
    ); 
    console.log(operacionesMesUnico)

    const porGasto = operacionesMesUnico
    .filter((operacion) => operacion.tipo === "gasto")
    .reduce((count, current) => count + Number(current.monto), 0); 
  console.log(porGasto);

  const nuevoObjeto = {
    mes: arrMesUnico[i],
    anio: arrAnio,
    gasto: porGasto,
  };
  totalesPorMesesGasto.push(nuevoObjeto);

  const resultadoMesMayorGasto = totalesPorMesesGasto.sort(
    (a, b) => b.gasto - a.gasto
  );

 document.getElementById("mes-mayor-gasto").innerHTML = "";
    let str = "";
  

      str += `
      <div class="row align-items-start m-4" >
      <div class="col w-25">
        Mes con Mayor Gasto
      </div>  
      <div class="col text-end">
          ${resultadoMesMayorGasto[0].mes}/${resultadoMesMayorGasto[0].anio}
          </div>
          <div class="col text-end">
            <span class="text-danger fw-bold">${resultadoMesMayorGasto[0].gasto}</span>
          </div>
      </div>
  
    `;
    document.getElementById("mes-mayor-gasto").innerHTML = str;
  
  }
};



//REPORTE TOTAL POR CATEGORIA
const totalPorCategoria = (operaciones, arrayCategorias) => {
  //RECORRER LA CATEGORIAS Y HACER UN NUEVO ARREGLO POR CADA CATEGORIA QUE TENGA ESA CATEGORIA
  //for each + filter + reduce
  document.getElementById("totales-por-categoria").innerHTML = "";
  let str = "";
  arrayCategorias.forEach((categoria) => {
    const porCategoria = operaciones.filter(
      (operacion) => operacion.categorias === categoria.nombre
    );
    console.log(porCategoria); //tira un arr con obj de las categorias

    const porCategoriaGanancia = porCategoria
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0);
    console.log(porCategoriaGanancia); //ME DEVUELVE 0, NO TOMA EL VALOR DEL ARREGLO
    console.log(
      `LA CATEGORIA ${arrayCategorias.nombre} ganancia ${porCategoriaGanancia}`
    ); //POR LO MENOS TOMA EL NOMBRE/////////////////////////////////////

    const porCategoriaGasto = porCategoria
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((count, current) => count + Number(current.monto), 0);
    console.log(porCategoriaGasto); //ME DEVUELVE 0, NO TOMA EL VALOR DEL ARREGLO
    console.log(
      `LA CATEGORIA ${arrayCategorias.nombre} GASTO  ${porCategoriaGasto}`
    );

    const balance = porCategoriaGanancia - porCategoriaGasto;
    console.log(balance);

    if(porCategoriaGanancia > 0 || porCategoriaGasto > 0) {
    str += `
      
      <div class="row align-items-start m-4" >
          <div class="col w-25">
            ${categoria.nombre}
          </div>
          <div class="col text-end">
            <span class="success">${porCategoriaGanancia}</span>
          </div>
          <div class="col danger text-end">
            ${porCategoriaGasto}
          </div>
          <div class="col text-black text-end" >
            ${balance}
          </div>
      </div>

    `;
  }
    document.getElementById("totales-por-categoria").innerHTML = str;
    ///////////////////////////////////////////////////////////////////////////////
  });
};

//REPORTE TOTAL POR MES
const totalPorMes = (arr) => {
  // console.log(arr)
  //creo un arr con meses
  //devolver los meses donde hay operaciones y si se repiten los meses dejar solo uno, una fila por mes. con new set no se repiten los valores
  const arrMesUnico = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[1])),
  ].sort(); //.split separa la fecha, el dia del mes del anio .sort acomoda de mayor a menor
  console.log(arrMesUnico);

  const arrAnio = [
    ...new Set(arr.map((operacion) => operacion.fecha.split("-")[0])),
  ].sort();
  document.getElementById("totales-por-mes").innerHTML = "";
  let str = "";

  for (let i = 0; i < arrMesUnico.length; i++) {
    const operacionesMesUnico = arr.filter(
      (operacion) => operacion.fecha.split("-")[1] === arrMesUnico[i]
    ); //entremos a todos los meses de cada una de las operaciones
    const porGanancia = operacionesMesUnico
      .filter((operacion) => operacion.tipo === "ganancia")
      .reduce((count, current) => count + Number(current.monto), 0); //.filter va a filtrar de cada mes que tenga operaciones, lo que sean gancias y con .reduce voy acumulando cada una, sumando
    const porGasto = operacionesMesUnico
      .filter((operacion) => operacion.tipo === "gasto")
      .reduce((count, current) => count + Number(current.monto), 0);
    // console.log(`mes ${arrMesUnico[i]}/${arrAnio} ganancia ${porGanancia}`);
    // console.log(`mes ${arrMesUnico[i]}/${arrAnio} gasto ${porGasto}`);

    const balance = porGanancia - porGasto;

    str += `
      <div class="row align-items-start m-4" >
        <div class="col">
          ${arrMesUnico[i]}/${arrAnio}
          </div>
          <div class="col text-end">
            <span class="text-success">+${porGanancia}</span>
          </div>
          <div class="col text-end">
            <span class="text-danger">-${porGasto}</span>
          </div>
          <div class="col text-end">
            ${balance}
          </div>
    </div>
 
    `;
    document.getElementById("totales-por-mes").innerHTML = str;
  }
};

console.log("prueba 4-9");

//INICIALIZAR
const inicializar = () => {
  const inputsFecha = document.querySelectorAll('input[type="date"]');
  inputsFecha.forEach((input) => {
    input.valueAsDate = new Date();
  });
  //AGREGAR LAS FUNCIONES QUE ESTAN SUELTAS PARA ACOMODAR EL CODIGO
  pintarOperaciones(operaciones);
  generarCategorias();
  mostrarOperaciones();
  // alterfy.success('Operacion Eliminada') //lanza un alerta que avise si estan ok las acciones que va realizando el usuario
};

window.onload = inicializar();
