const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
    const inputValue = searchInput.value.trim().toLowerCase();

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const suggestions = data.suggestions;
            const filteredSuggestions = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(inputValue)
            );

            suggestionsList.innerHTML = '';
            filteredSuggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                suggestionsList.appendChild(li);
            });

            if (filteredSuggestions.length > 0) {
                suggestionsList.style.display = 'block';
            } else {
                suggestionsList.style.display = 'none';
            }
        });
});

suggestionsList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        searchInput.value = event.target.textContent;
        suggestionsList.style.display = 'none';
    }
});

document.addEventListener('click', (event) => {
    if (event.target !== searchInput) {
        suggestionsList.style.display = 'none';
    }
});
