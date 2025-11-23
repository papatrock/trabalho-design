//  Fetch API

document.getElementById('formReserva').addEventListener('submit', async (event) => {
    event.preventDefault();

    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.style.display = 'none';

    const dados = {
        cliente: document.getElementById('cliente').value,
        espacoId: document.getElementById('espacoId').value,
        data: document.getElementById('data').value
    };

    try {
        const response = await fetch('/api/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        mensagemDiv.style.display = 'block';

        if (response.ok) {
            mensagemDiv.className = 'sucesso';
            mensagemDiv.textContent = `Reserva confirmada. ID: ${resultado.data.id}`;
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