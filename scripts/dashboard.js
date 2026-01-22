 // Demo user (replace with localStorage logic if needed)
        const user = {
            name: "Ahana Awasthi",
            email: "ahana@example.com",
            age: 20,
            gender: "Female"
        };

        // Load user info
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userAge').textContent = user.age;
        document.getElementById('userGender').textContent = user.gender;

        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        document.getElementById('avatar').textContent = initials;

        // Edit profile placeholder
        function editProfile() {
            alert('Edit Profile: This will open a form in a real app.');
        }

        // Logout placeholder
        function logout() {
            alert('Logout: Redirect to login page or clear session.');
        }

        // Plant care tips
        const tips = [
            { icon: '💧', text: 'Water succulents once a week.' },
            { icon: '☀️', text: 'Place plants in indirect sunlight.' },
            { icon: '🪴', text: 'Use well-draining soil.' },
            { icon: '🌱', text: 'Fertilize monthly for healthy growth.' },
            { icon: '🍂', text: 'Remove dead leaves to keep plants fresh.' }
        ];
        const tipsSection = document.getElementById('tipsSection');
        tips.forEach(tip => {
            const div = document.createElement('div');
            div.className = 'tip-card';
            div.innerHTML = `<i>${tip.icon}</i><p>${tip.text}</p>`;
            tipsSection.appendChild(div);
        });

        // Recommended plants
        const recommendedPlants = [
            { name: 'Snake Plant', img: './images/snake-plant.jpg' },
            { name: 'Aloe Vera', img: './images/aloe-vera-plant.jpg' },
            { name: 'Fiddle Leaf Fig', img: './images/fiddle-leaf-fig.jpg' }
        ];
        const plantsList = document.getElementById('plantsList');
        recommendedPlants.forEach(plant => {
            const div = document.createElement('div');
            div.className = 'plant-card';
            div.innerHTML = `<img src="${plant.img}" alt="${plant.name}"><h4>${plant.name}</h4>`;
            plantsList.appendChild(div);
        });