const loadControls = () => {
  const txtNumero = document.getElementById("txtNumero");
  const cbOrigen = document.getElementById("cbOrigen");
  const cbDestino = document.getElementById("cbDestino");
  const txtHoraSalida = document.getElementById("txtHoraSalida");
  const txtIntervalo = document.getElementById("txtIntervalo");
  
  
}

const showAnyadirLineaEvt = function () {
  
  if (editLinea) {
    editLinea.style = "display:block;";
    hijos = editLinea.childNodes;

    for (let h of hijos) {
      h.value = "";
      h.disabled = "";
    }
  }
};
const showEditarLineaEvt = () => {
  numero = prompt("Introduce número de línea");
  if (isNaN(numero)) {
    alert("Número no válido");
    return;
  }
  if (editLinea) {
    editLinea.style = "display:block;";
    txtNumero.disabled = "disabled";
    txtNumero.value = numero;
    
  }
};
const accionLineaEvt = () => {
  if (txtNumero) {
    let numero = parseInt(txtNumero.value);
    if (isNaN(numero))
      alert('El número introducido no es válido')
    else if (cbOrigen.value === cbDestino.value)
      alert('El origen no puede ser igual al destino')
    else if (!checkHora(txtHoraSalida))
      alert('La hora de salida no es válida')
    else  if (txtNumero.disabled) {
        
        modificarLineaPorNumero(
          numero,
          cbOrigen.value,
          cbDestino.value,
          txtHoraSalida.value,
          txtIntervalo.value
        );
        limpiaFormLinea();
    } else {
      if (existeLinea(numero))
        alert('El número de línea ya existe');
      else
      insertaLinea(
        numero,
        cbOrigen.value,
        cbDestino.value,
        txtHoraSalida.value,
        txtIntervalo.value
      );
      limpiaFormLinea();
    }
  }

  
};

const limpiaFormLinea = () => {
  lineas = getLineas();
  loadData();
  hijos = editLinea.childNodes;
  for (let h of hijos) {
    h.value = "";
  }
  editLinea.style = "display:none;";
}
const eliminarLineasEvt = () => {
  numeroLinea = prompt("Introduce número de línea");
  numeroLinea = parseInt(numeroLinea);
  if (isNaN(numeroLinea)) alert("El número de línea introducido no es válido");
  else eliminaLineaPorNumero(numeroLinea);
  loadData();
};

const modificarLineasEvt = () => {
  lineas = getLineas();
  console.log(lineas);
  loadData();
};
