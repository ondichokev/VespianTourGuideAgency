document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const guidesList = document.getElementById('guidesList');
    const searchInput = document.getElementById('search');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(response => response.json())
          .then(data => alert('User registered successfully!'));
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.username === username && u.password === password);
                if (user) {
                    alert('Login successful!');
                } else {
                    alert('Invalid username or password');
                }
            });
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        fetch('http://localhost:3000/guides')
            .then(response => response.json())
            .then(guides => {
                guidesList.innerHTML = '';
                guides.filter(guide => guide.destination.toLowerCase().includes(query) ||
                                       guide.language.toLowerCase().includes(query))
                      .forEach(guide => {
                          const guideCard = document.createElement('div');
                          guideCard.className = 'card';
                          guideCard.innerHTML = `
                            <div class="card-body">
                                <h5 class="card-title">${guide.name}</h5>
                                <p class="card-text">Destination: ${guide.destination}</p>
                                <p class="card-text">Language: ${guide.language}</p>
                                <p class="card-text">Rating: ${guide.rating}</p>
                                <button class="btn btn-primary">Book Now</button>
                            </div>
                          `;
                          guidesList.appendChild(guideCard);
                      });
            });
    });
});
