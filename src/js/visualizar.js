import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("agendamentos-container");
const btnVoltar = document.getElementById("btnVoltar");

btnVoltar.addEventListener("click", () => {
    history.back();
});

// Função para buscar e mostrar agendamentos
async function mostrarAgendamentos() {
    const q = query(collection(db, "agendamentos"), orderBy("data"));
    const querySnapshot = await getDocs(q);

    container.innerHTML = "";

    querySnapshot.forEach((documento) => {
        const data = documento.data();
        const card = document.createElement("div");
        card.classList.add("agendamento-card");
        card.innerHTML = `
            <p><strong>Nome:</strong> ${data.nome} ${data.sobrenome}</p>
            <p><strong>Telefone:</strong> ${data.telefone}</p>
            <p><strong>Data:</strong> ${data.data}</p>
            <p><strong>Serviço:</strong> ${data.servico}</p>
            <button class="btn btn-outlined btn-delete">Deletar</button>
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

    });
}

mostrarAgendamentos();