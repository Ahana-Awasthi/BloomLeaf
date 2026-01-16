 // Initialize default user if none exists (with expanded profile)
        function initUsers() {
            if (!localStorage.getItem('users')) {
                const defaultUsers = [{
                    name: 'John Doe',
                    email: 'user@example.com',
                    age: 30,
                    phone: '+1-234-567-8900',
                    address: '123 Main St, Anytown, USA 12345',
                    password: 'password123'
                }];
                localStorage.setItem('users', JSON.stringify(defaultUsers));
            }
        }

        // Get users from localStorage
        function getUsers() {
            return JSON.parse(localStorage.getItem('users') || '[]');
        }

        // Save users to localStorage
        function saveUsers(users) {
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Validate email
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        // Validate phone (basic)
        function isValidPhone(phone) {
            return /^\+?[\d\s-]{10,}$/.test(phone);
        }

        // Show/hide error message
        function showMessage(elementId, message, isError = true) {
            const msg = document.getElementById(elementId);
            msg.textContent = message;
            msg.style.display = 'block';
            if (!isError) {
                msg.className = 'success';
            } else {
                msg.className = 'error';
            }
            setTimeout(() => { msg.style.display = 'none'; }, 3000);
        }

        // Open registration modal
        function openModal(event) {
            event.preventDefault();
            document.getElementById('registerModal').style.display = 'flex';
        }

        // Close registration modal
        function closeModal() {
            document.getElementById('registerModal').style.display = 'none';
            document.getElementById('registerForm').reset();
            document.getElementById('regErrorMsg').style.display = 'none';
        }

        // Check if already logged in
        function checkLoggedIn() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                window.location.href = 'dashboard.html';
            }
        }

        // Login handler
        document.getElementById('loginForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const remember = document.getElementById('remember').checked;

            if (!isValidEmail(email)) {
                showMessage('errorMsg', 'Please enter a valid email.');
                return;
            }
            if (password.length < 6) {
                showMessage('errorMsg', 'Password must be at least 6 characters.');
                return;
            }

            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store full user object for dashboard
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser ', JSON.stringify(user));
                showMessage('errorMsg', 'Login successful! Redirecting...', false);
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showMessage('errorMsg', 'Invalid email or password.');
            }
        });

        // Register handler (expanded)
        document.getElementById('registerForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const age = parseInt(document.getElementById('regAge').value);
            const phone = document.getElementById('regPhone').value.trim();
            const address = document.getElementById('regAddress').value.trim();
            const password = document.getElementById('regPassword').value.trim();

            if (!name || name.length < 2) {
                showMessage('regErrorMsg', 'Please enter a valid full name.');
                return;
            }
            if (!isValidEmail(email)) {
                showMessage('regErrorMsg', 'Please enter a valid email.');
                return;
            }
            if (age < 18) {
                showMessage('regErrorMsg', 'Age must be at least 18.');
                return;
            }
            if (!isValidPhone(phone)) {
                showMessage('regErrorMsg', 'Please enter a valid phone number.');
                return;
            }
            if (!address || address.length < 10) {
                showMessage('regErrorMsg', 'Please enter a valid address.');
                return;
            }
            if (password.length < 6) {
                showMessage('regErrorMsg', 'Password must be at least 6 characters.');
                return;
            }

            const users = getUsers();
            if (users.find(u => u.email === email)) {
                showMessage('regErrorMsg', 'Email already registered.');
                return;
            }

            const newUser = { name, email, age, phone, address, password };
            users.push(newUser);
            saveUsers(users);
            showMessage('regErrorMsg', 'Registration successful! You can now log in.', false);
            closeModal();
            document.getElementById('loginForm').reset();
        });

        // Initialize on load
        initUsers();
        checkLoggedIn();

        // Close modal on outside click
        window.onclick = function (event) {
            const modal = document.getElementById('registerModal');
            if (event.target === modal) {
                closeModal();
            }
        }