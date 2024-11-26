class EditLinea extends HTMLElement {
  constructor() {
    super(); // Llama al constructor de HTMLElement

    // Crea el Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Template HTML del componente
    const template = document.createElement("template");
    template.innerHTML = `
    <div id="editLinea" style="display: none">
      <br /><br />
      <label for="txtNumero">Número:</label>
      <input type="number" step="1" min="1" id="txtNumero" required />
      <br /><br />
      <label for="cbOrigen">Origen:</label>
      <select id="cbOrigen">
        <option>Avilés</option>
        <option>Corvera</option>
        <option>Gijón</option>
        <option>Luanco</option>
        <option>Oviedo</option>
      </select>
      <br /><br />
      <label for="cbDestino">Destino:</label>
      <select id="cbDestino">
        <option>Avilés</option>
        <option>Corvera</option>
        <option>Gijón</option>
        <option>Luanco</option>
        <option>Oviedo</option>
      </select>
      <br /><br />
      <label for="txtHoraSalida">Hora de salida:</label>
      <input type="time" id="txtHoraSalida" /> <br /><br />
      <label for="txtIntervalo">Intervalo:</label>
      <input type="time" id="txtIntervalo" /> <br /><br />
      <button id="btnAccionLinea">Guardar</button>
      </div>
      `;

    // Adjuntar contenido al Shadow DOM
    shadow.appendChild(template.content.cloneNode(true));
  }

  // Métodos del ciclo de vida del componente
  connectedCallback() {
    // Mostrar el contenido si tiene el atributo 'visible'
    const editLineaDiv = this.shadowRoot.querySelector("#editLinea");
    if (this.hasAttribute("visible")) {
      editLineaDiv.style.display = "block";
    }

    // Escuchar eventos del botón
    this.shadowRoot
      .querySelector("#btnAccionLinea")
      .addEventListener("click", () => {
        const data = {
          numero: this.shadowRoot.querySelector("#txtNumero").value,
          origen: this.shadowRoot.querySelector("#cbOrigen").value,
          destino: this.shadowRoot.querySelector("#cbDestino").value,
          horaSalida: this.shadowRoot.querySelector("#txtHoraSalida").value,
          intervalo: this.shadowRoot.querySelector("#txtIntervalo").value,
        };
        this.dispatchEvent(new CustomEvent("guardar", { detail: data }));
      });
  }

  disconnectedCallback() {
    // Limpia los eventos si es necesario
    this.shadowRoot
      .querySelector("#btnAccionLinea")
      .removeEventListener("click");
  }

  // Métodos para controlar visibilidad
  show() {
    this.shadowRoot.querySelector("#editLinea").style.display = "block";
  }

  hide() {
    this.shadowRoot.querySelector("#editLinea").style.display = "none";
  }
  // Observa el atributo 'visible'
  static get observedAttributes() {
    return ["visible"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "visible") {
      const editLineaDiv = this.shadowRoot.querySelector("#editLinea");
      editLineaDiv.style.display = newValue !== null ? "block" : "none";
    }
  }
}

// Registrar el Web Component
customElements.define("edit-linea", EditLinea);
