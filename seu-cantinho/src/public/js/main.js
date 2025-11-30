// Verifica se está logado
Auth.requireAuth();

// 1. Preenche o nome do cliente automaticamente
const user = Auth.getUser();
const clienteInput = document.getElementById('cliente');
if (user) {
    clienteInput.value = user.nome;
}

// 2. FUNÇÃO NOVA: Carregar espaços do banco de dados
async function carregarEspacos() {
    try {
        const response = await fetch('/api/espacos');
        console.log("ESPACOOOOOSSSS", response);
        const resultado = await response.json();

        const select = document.getElementById('espacoId');

        // Limpa opções antigas (hardcoded)
        select.innerHTML = '<option value="">Selecione um espaço...</option>';

        if (resultado.data && resultado.data.length > 0) {
            resultado.data.forEach(espaco => {
                const option = document.createElement('option');
                option.value = espaco.id;
                // Exibe: "Salão de Festas (Filial Curitiba) - R$ 1500.00"
                option.textContent = `${espaco.nome} (${espaco.filial_nome}) - R$ ${espaco.preco_base}`;
                select.appendChild(option);
            });

            // Verifica se veio um ID da URL (pré-seleção vinda do dashboard)
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

// 3. Seleciona o item correto se veio da URL (?espacoId=1)
function verificarPreSelecao() {
    const urlParams = new URLSearchParams(window.location.search);
    const espacoPreSelecionado = urlParams.get('espacoId');

    if (espacoPreSelecionado) {
        const select = document.getElementById('espacoId');
        select.value = espacoPreSelecionado;
    }
}


async function carregarEspacos() {
    try {
        const response = await fetch('/api/espacos');
        const resultado = await response.json();

        console.log("ESPACOOOOOSSSS", resultado);

        const select = document.getElementById('espacoId');

        const listaDeEspacos = resultado.espacos || resultado.data || [];

        // Limpa opções antigas (hardcoded)
        select.innerHTML = '<option value="">Selecione um espaço...</option>';

        if (listaDeEspacos.length > 0) {
            listaDeEspacos.forEach(espaco => {
                const option = document.createElement('option');
                option.value = espaco.id;
                // Exibe: "Salão de Festas (Filial Curitiba) - R$ 1500.00"
                option.textContent = `${espaco.nome} (${espaco.filial_nome || 'Filial'}) - R$ ${espaco.preco_base}`;
                select.appendChild(option);
            });

            // Verifica se veio um ID da URL (pré-seleção vinda do dashboard)
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


// submit das reservar
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