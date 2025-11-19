<script>
  const form = document.getElementById('regForm');
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const agree = document.getElementById('agree');

  const err = id => document.getElementById(id);
  const pwBar = document.getElementById('pwBar');
  const formMessage = document.getElementById('formMessage');
  const modal = document.getElementById('modal');

  function resetErrors() {
    ['errFullname','errEmail','errPhone','errUsername','errPassword','errConfirm','errAgree']
      .forEach(id => err(id).textContent = '');
    formMessage.textContent = '';
  }

  function validateEmail(e) {
    return /^\S+@\S+\.\S+$/.test(e);
  }

  function passwordScore(pw) {
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score; 
  }

  password.addEventListener('input', () => {
    const s = passwordScore(password.value);
    pwBar.style.width = (s / 4 * 100) + '%';
  });

  document.getElementById('clearBtn').addEventListener('click', () => {
    form.reset();
    pwBar.style.width = '0%';
    resetErrors();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    resetErrors();
    let ok = true;

    if (!fullname.value.trim()) { err('errFullname').textContent = 'Full name is required.'; ok = false; }
    if (!username.value.trim()) { err('errUsername').textContent = 'Choose a username.'; ok = false; }
    if (!email.value.trim() || !validateEmail(email.value)) { err('errEmail').textContent = 'Please enter a valid email.'; ok = false; }
    if (password.value.length < 8) { err('errPassword').textContent = 'Password must be at least 8 characters.'; ok = false; }
    if (password.value !== confirm.value) { err('errConfirm').textContent = 'Passwords do not match.'; ok = false; }
    if (!agree.checked) { err('errAgree').textContent = 'You must agree to the terms.'; ok = false; }

    if (phone.value.trim() && !/^\+?[0-9\s\-]{7,20}$/.test(phone.value)) {
      err('errPhone').textContent = 'Please enter a valid phone number.';
      ok = false;
    }

    if (!ok) {
      formMessage.innerHTML = '<div class="error">Please fix the errors above.</div>';
      return;
    }

    modal.classList.add('open');
    document.getElementById('modalText').textContent =
      `Welcome, ${fullname.value.split(' ')[0] || fullname.value}! (this is a demo)`;
  });

  document.getElementById('closeModal').addEventListener('click', () => {
    modal.classList.remove('open');
    form.reset();
    pwBar.style.width = '0%';
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') modal.classList.remove('open');
  });
</script>
