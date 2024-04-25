// Código JavaScript para manipulação de eventos
const inputBox = document.getElementById('input-box');

inputBox.addEventListener('input', () => {
    const words = inputBox.value.trim().split(/\s+/);
    const wordCount = Math.min(words.length, 125);
    document.getElementById('word-counter').textContent = `${wordCount}/125`;
});

document.getElementById('paraphrase-btn').addEventListener('click', async () => {
    const inputText = inputBox.value.trim();

    if (inputText === '') {
        alert('Por favor, insira algum texto.');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/paraphrase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        });

        if (!response.ok) {
            throw new Error('Erro ao parafrasear o texto');
        }

        const data = await response.json();
        const paraphrasedText = data.paraphrasedText;

        document.getElementById('output-box').textContent = paraphrasedText;
    } catch (error) {
        console.error('Erro ao parafrasear:', error);
        alert('Erro ao parafrasear o texto. Por favor, tente novamente.');
    }
});

document.getElementById('clear-btn').addEventListener('click', () => {
    inputBox.value = '';
    document.getElementById('word-counter').textContent = '0/125';
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const outputText = document.getElementById('output-box').textContent;
    navigator.clipboard.writeText(outputText)
        .then(() => {
            alert('Texto copiado com sucesso!');
        })
        .catch(err => {
            console.error('Erro ao copiar texto:', err);
        });
});
