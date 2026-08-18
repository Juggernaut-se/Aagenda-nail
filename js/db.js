const DB_NAME = "AgendaNailDB";
const DB_VERSION = 1;

let banco = null;

function abrirBanco() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB_NAME, DB_VERSION);

    r.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains("clientes")) {
        db.createObjectStore("clientes", {
          keyPath: "id",
          autoIncrement: true
        });
      }

      if (!db.objectStoreNames.contains("atendimentos")) {
        db.createObjectStore("atendimentos", {
          keyPath: "id",
          autoIncrement: true
        });
      }
    };

    r.onsuccess = (e) => {
      banco = e.target.result;
      resolve(banco);
    };

    r.onerror = () => reject(r.error);
  });
}

function salvarRegistro(loja, dados) {
  return new Promise((resolve, reject) => {
    const r = banco
      .transaction(loja, "readwrite")
      .objectStore(loja)
      .put(dados);

    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

function buscarTodos(loja) {
  return new Promise((resolve, reject) => {
    const r = banco
      .transaction(loja, "readonly")
      .objectStore(loja)
      .getAll();

    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
      }
