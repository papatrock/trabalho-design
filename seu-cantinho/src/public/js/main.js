Auth.requireAuth();

const user = Auth.getUser();
const clienteInput = document.getElementById('cliente');
if (user) {
    clienteInput.value = user.nome;
}

async function carregarEspacos() {
    try {
        const response = await fetch('/api/espacos');
        const resultado = await response.json();

        console.log("ESPACOOOOOSSSS", resultado);

        const select = document.getElementById('espacoId');

        const listaDeEspacos = resultado.espacos || resultado.data || [];

        select.innerHTML = '<option value="">Selecione um espaço...</option>';

        if (listaDeEspacos.length > 0) {
            listaDeEspacos.forEach(espaco => {
                const option = document.createElement('option');
                option.value = espaco.id;
                option.textContent = `${espaco.nome} (${espaco.filial_nome || 'Filial'}) - R$ ${espaco.preco_base}`;
                select.appendChild(option);
            });

            verificarPreSelecao();
        } else {
             const option = document.createElement('option');
             option.textContent = "Nenhum espaço disponível";
             select.appendChild(option);
        }

    } catch (error) {
        console.error("Erro ao carregar espaços:", error);
        alert("Erro ao carregar lista de espaços.");
    }
}

function verificarPreSelecao() {
    const urlParams = new URLSearchParams(window.location.search);
    const espacoPreSelecionado = urlParams.get('espacoId');

    if (espacoPreSelecionado) {
        const select = document.getElementById('espacoId');
        select.value = espacoPreSelecionado;
    }
}

document.getElementById('formReserva').addEventListener('submit', async (event) => {
    event.preventDefault();

    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.style.display = 'none';

    const espacoId = document.getElementById('espacoId').value;
    if (!espacoId) {
        alert("Por favor, selecione um espaço.");
        return;
    }

    const dados = {
        usuarioId: user.id,
        cliente: user.nome,
        espacoId: espacoId,
        data: document.getElementById('data').value
    };

    try {
        const response = await fetch('/api/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();
        mensagemDiv.style.display = 'block';

        if (response.ok) {
            mensagemDiv.className = 'sucesso';
            mensagemDiv.innerHTML = `
            <strong>Sucesso!</strong> Reserva confirmada.<br>
            ID: ${resultado.data.id} <br>
            <a href="espacos.html">Voltar para Dashboard</a>
            `;
            document.getElementById('data').value = '';
        } else {
            mensagemDiv.className = 'erro';
            mensagemDiv.textContent = `Erro: ${resultado.error || 'Falha ao reservar'}`;
        }

    } catch (erro) {
        console.error('Erro de rede:', erro);
        mensagemDiv.style.display = 'block';
        mensagemDiv.className = 'erro';
        mensagemDiv.textContent = 'Erro de conexão com o servidor.';
    }
});

carregarEspacos();