import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("agendamentos-container");
const btnVoltar = document.getElementById("btnVoltar");

btnVoltar.addEventListener("click", () => {
    history.back();
});

// Pega o telefone para consulta (se tiver)
const urlParams = new URLSearchParams(window.location.search);
const filtroTelefone = urlParams.get("telefone") || "";

// Função para buscar e mostrar agendamentos
async function mostrarAgendamentos(filtro = "") {
    const q = query(collection(db, "agendamentos"), orderBy("data"));
    const querySnapshot = await getDocs(q);

    container.innerHTML = "";

    // Filtra por telefone (caso tenha filtragem)
    const resultados = querySnapshot.docs.filter(docu => {
        const data = docu.data();
        if (!data.telefone) return false;
        return filtro ? data.telefone.replace(/\D/g, "") === filtro : true;
    });

    if (resultados.length === 0) {
        container.innerHTML = `<p style="color:#00000; width: 100%; text-align: center; font-size:1.2rem; font-weight: 500;">Nenhum agendamento encontrado.</p>`;
        return;
    }

    resultados.forEach((documento) => {
        const data = documento.data();
        const card = document.createElement("div");
        card.classList.add("agendamento-card");
        card.innerHTML = `
            <p><strong>Nome:</strong> ${data.nome} ${data.sobrenome}</p>
            <p><strong>Telefone:</strong> ${data.telefone}</p>
            <p><strong>Data:</strong> ${data.data}</p>
            <p><strong>Serviço:</strong> ${data.servico}</p>
            <div style="display:flex; gap:8px; margin-top: auto; justify-content: flex-end;  ">
                <button class="btn btn-outlined btn-update">Atualizar</button>
                <button class="btn btn-outlined btn-delete">Deletar</button>
            </div>
        `;
        container.appendChild(card);

        // Botão de excluir
        const btnDelete = card.querySelector(".btn-delete");
        btnDelete.addEventListener("click", async () => {
            const confirmDelete = confirm(`Deseja realmente deletar o agendamento de ${data.nome}?`);
            if (!confirmDelete) return;

            try {
                await deleteDoc(doc(db, "agendamentos", documento.id));
                card.remove();
                alert("Agendamento deletado com sucesso!");
            } catch (error) {
                console.error("Erro ao deletar:", error);
                alert("Erro ao deletar o agendamento.");
            }
        });

        // Botão atualizar (por enquanto apenas telefone)
        const btnUpdate = card.querySelector(".btn-update");
        btnUpdate.addEventListener("click", async () => {
            const novoTelefone = prompt("Digite o novo telefone:", data.telefone);
            if (!novoTelefone) return;

            const somenteNumeros = novoTelefone.replace(/\D/g, "");
            if (somenteNumeros.length !== 11) {
                alert("Digite um telefone válido com 11 dígitos!");
                return;
            }

            try {
                await updateDoc(doc(db, "agendamentos", documento.id), { telefone: novoTelefone });
                data.telefone = novoTelefone;
                card.querySelector("p:nth-child(2)").textContent = `Telefone: ${novoTelefone}`;
                alert("Agendamento atualizado!");
            } catch (error) {
                console.error("Erro ao atualizar:", error);
                alert("Erro ao atualizar agendamento.");
            }
        });

    });
}

mostrarAgendamentos(filtroTelefone);