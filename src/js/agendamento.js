import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("formAgendamento");
const telefoneInput = document.getElementById("telefone");


// Máscara do Telefone (ajustando ele no field)
telefoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");

    e.target.value = value;
});


// Evento submit para criar agendamento
form.addEventListener("submit", async (e) => {
    e.preventDefault();


    // Evita que o usuário clique mais de uma vez no submit
    const submitBtn = form.querySelector("button[type='submit']");
    const textoOriginal = submitBtn.textContent;

    //Aqui muda o "Marcar agendamento" temporariamente
    submitBtn.disabled = true; //true = desativar o botao (bloqueia), false = ativar novamente (libera)
    submitBtn.textContent = "Enviando...";

    try {
        const nome = document.getElementById("name").value.trim();
        const sobrenome = document.getElementById("last-name").value.trim();
        const data = document.getElementById("marcado").value;
        const telefone = document.getElementById("telefone").value.trim();
        const servicoSelecionado = document.querySelector('input[name="service"]:checked');

        if (!nome || !sobrenome || !data || !telefone) {
            mostrarMensagem("Preencha todos os campos!");
            return;
        }

        if (telefone.length < 10) {
            mostrarMensagem("Digite um telefone válido!");
            return;
        }

        if (!servicoSelecionado) {
            mostrarMensagem("Selecione um serviço!");
            return;
        }

        await addDoc(collection(db, "agendamentos"), {
            nome,
            sobrenome,
            data,
            telefone,
            servico: servicoSelecionado.value,
            criadoEm: new Date()
        });

        mostrarMensagem("Agendamento salvo! Enviaremos uma mensagem via WhatsApp para mais informações.", true);
        form.reset();

    }
    catch (error) {
        console.error("Erro ao salvar:", error);
        mostrarMensagem("Erro ao salvar agendamento.");
    }

    finally {
        submitBtn.disabled = false;
        submitBtn.textContent = textoOriginal;
    }

});

// Funcionamento do botão de sair
const btnExit = document.getElementById("btnExit");
btnExit.addEventListener("click", () => {
    history.back();
});

document.getElementById('btnVisualizar').addEventListener("click", function() {
    window.location.href = "visualizar.html";
});


//Retorna ao usuário
function mostrarMensagem(texto, sucesso = false) {
    const mensagem = document.createElement("div");

    mensagem.textContent = texto;
    mensagem.style.position = "fixed";
    mensagem.style.bottom = "20px";
    mensagem.style.right = "20px";
    mensagem.style.padding = "12px 20px";
    mensagem.style.borderRadius = "8px";
    mensagem.style.color = "#fff";
    mensagem.style.fontWeight = "500";
    mensagem.style.boxShadow = "0px 5px 15px rgba(0,0,0,0.3)";
    mensagem.style.backgroundColor = sucesso ? "#22c55e" : "#ef4444";
    mensagem.style.zIndex = "9999";
    mensagem.style.transition = "0.3s all";

    document.body.appendChild(mensagem);

    setTimeout(() => {
        mensagem.remove();
    }, 5000);
}