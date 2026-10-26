import {
    loginWithEmailPassword,
    registerWithEmailPassword,
    loginWithGoogle,
    logout as firebaseLogout
} from './firebase.js';
import { setUserId, setUseLocalStorage, getWarbands } from './state.js';
import { listenToWarbands, unsubscribeFromWarbands } from './warband-service.js';
import { showListView } from './ui.js';

const TOKEN_KEY = 'grimheim_auth_token';
const USER_KEY = 'grimheim_auth_user';

export function getStoredToken() {
    return localStorage.getItem(TOKEN_KEY) || localStorage.getItem('rosterheim_auth_token');
}

export function getStoredUser() {
    try {
        const u = localStorage.getItem(USER_KEY) || localStorage.getItem('rosterheim_auth_user');
        return u ? JSON.parse(u) : null;
    } catch {
        return null;
    }
}

export function setStoredSession(token, user) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem('rosterheim_auth_token', token);
    }
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem('rosterheim_auth_user', JSON.stringify(user));
    }
}

export function clearStoredSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('rosterheim_auth_token');
    localStorage.removeItem('rosterheim_auth_user');
}

function formatAuthError(err) {
    if (!err) return 'Se ha producido un error inesperado.';
    const code = err.code || '';
    switch (code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
            return 'Correo electrónico o contraseña incorrectos.';
        case 'auth/user-not-found':
            return 'No existe ninguna cuenta asociada a este correo electrónico.';
        case 'auth/email-already-in-use':
            return 'Este correo electrónico ya está registrado. Usa la pestaña "Iniciar Sesión".';
        case 'auth/weak-password':
            return 'La contraseña debe tener un mínimo de 6 caracteres.';
        case 'auth/invalid-email':
            return 'El formato del correo electrónico no es válido.';
        case 'auth/operation-not-allowed':
            return 'La autenticación con email/contraseña no está habilitada en Firebase Console.';
        case 'auth/popup-closed-by-user':
            return 'Se ha cancelado la ventana de Google.';
        case 'auth/network-request-failed':
            return 'Error de conexión con Firebase. Revisa tu conexión a internet.';
        default:
            return err.message || 'Error de autenticación.';
    }
}

async function parseJsonResponse(res, defaultErrMsg = 'Error en el servidor.') {
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || defaultErrMsg);
        }
        return data;
    }
    if (res.status === 404) {
        throw new Error('Servidor Node no activo para esta ruta.');
    }
    const text = await res.text();
    throw new Error(`Error (${res.status}): ${text.slice(0, 100)}`);
}

/**
 * Perform login request (legacy local server fallback)
 */
export async function apiLogin(username, password) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await parseJsonResponse(res, 'Error al iniciar sesión.');
    setStoredSession(data.token, data.user);
    return data;
}

/**
 * Verify current session with server
 */
export async function apiGetMe() {
    const token = getStoredToken();
    if (!token) return null;

    try {
        const res = await fetch('/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            clearStoredSession();
            return null;
        }
        const data = await res.json();
        setStoredSession(token, data.user);
        return data.user;
    } catch {
        return getStoredUser();
    }
}

/**
 * Perform logout request
 */
export async function apiLogout() {
    const token = getStoredToken();
    if (token) {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (e) {
            console.warn('Error notifying logout to server:', e);
        }
    }
    clearStoredSession();
}

/**
 * Superuser API: Get all users
 */
export async function apiGetUsers() {
    const token = getStoredToken();
    const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Error al obtener usuarios.');
    }
    return data.users;
}

/**
 * Superuser API: Create user
 */
export async function apiCreateUser(userData) {
    const token = getStoredToken();
    const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Error al crear usuario.');
    }
    return data.user;
}

/**
 * Superuser API: Update user
 */
export async function apiUpdateUser(id, userData) {
    const token = getStoredToken();
    const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Error al actualizar usuario.');
    }
    return data.user;
}

/**
 * Superuser API: Delete user
 */
export async function apiDeleteUser(id) {
    const token = getStoredToken();
    const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || 'Error al eliminar usuario.');
    }
    return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI Management
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Renders user info in the top header and controls visibility of superuser buttons
 */
export function updateAuthUI(user) {
    const userInfoEl = document.getElementById('user-info');
    const adminBtn = document.getElementById('admin-users-btn');
    const logoutBtn = document.getElementById('system-logout-btn');
    const mobileAdminBtn = document.getElementById('mobile-admin-users-btn');
    const mobileLogoutBtn = document.getElementById('mobile-system-logout-btn');

    if (user) {
        if (userInfoEl) {
            const roleBadge = user.is_guest
                ? '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700 ml-1.5"><i class="fas fa-hdd text-[9px] mr-1 text-slate-400"></i>Local</span>'
                : (user.is_superuser
                    ? '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-300/90 border border-amber-600/30 ml-1.5"><i class="fas fa-crown text-[9px] mr-1 text-amber-300/80"></i>Superusuario</span>'
                    : '<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-300/90 border border-amber-600/30 ml-1.5"><i class="fas fa-cloud text-[9px] mr-1 text-amber-300/80"></i>Nube</span>');
            
            const displayName = user.username || user.email || (user.is_guest ? 'Invitado' : 'Usuario');
            userInfoEl.innerHTML = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-750/70 text-xs shadow-xs"><span class="text-slate-400">Sesión:</span> <strong class="text-slate-200 font-semibold">${escapeHtml(displayName)}</strong> ${roleBadge}</span>`;
        }

        if (adminBtn) {
            if (user.is_superuser) {
                adminBtn.classList.remove('hidden');
                adminBtn.classList.add('flex');
            } else {
                adminBtn.classList.add('hidden');
                adminBtn.classList.remove('flex');
            }
        }
        if (mobileAdminBtn) {
            if (user.is_superuser) {
                mobileAdminBtn.classList.remove('hidden');
                mobileAdminBtn.classList.add('flex');
            } else {
                mobileAdminBtn.classList.add('hidden');
                mobileAdminBtn.classList.remove('flex');
            }
        }

        if (logoutBtn) {
            logoutBtn.classList.remove('hidden');
            logoutBtn.classList.add('flex');
        }
        if (mobileLogoutBtn) {
            mobileLogoutBtn.classList.remove('hidden');
            mobileLogoutBtn.classList.add('flex');
        }
    } else {
        if (userInfoEl) {
            userInfoEl.innerHTML = '<span class="text-slate-400">Sin sesión iniciada</span>';
        }
        if (adminBtn) adminBtn.classList.add('hidden');
        if (mobileAdminBtn) mobileAdminBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
        if (mobileLogoutBtn) mobileLogoutBtn.classList.add('hidden');
    }
}

/**
 * Shows the full-screen blocking login overlay
 */
export function showBlockingLoginScreen(errorMessage = '') {
    document.documentElement.classList.remove('auth-verified');
    const overlay = document.getElementById('system-login-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.style.display = 'flex';
    }
    const app = document.getElementById('app');
    if (app) {
        app.classList.add('hidden');
        app.style.display = 'none';
    }
    document.body.style.overflow = 'hidden';

    const errorDiv = document.getElementById('system-login-error');
    if (errorDiv) {
        if (errorMessage) {
            errorDiv.textContent = errorMessage;
            errorDiv.classList.remove('hidden');
        } else {
            errorDiv.textContent = '';
            errorDiv.classList.add('hidden');
        }
    }

    const userInput = document.getElementById('system-login-username');
    if (userInput) {
        setTimeout(() => userInput.focus(), 100);
    }
}

/**
 * Hides the blocking login overlay
 */
export function hideBlockingLoginScreen() {
    document.documentElement.classList.add('auth-verified');
    const overlay = document.getElementById('system-login-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.style.display = 'none';
    }
    const app = document.getElementById('app');
    if (app) {
        app.classList.remove('hidden');
        app.style.display = 'block';
    }
    document.body.style.overflow = '';

    const errorDiv = document.getElementById('system-login-error');
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.classList.add('hidden');
    }
}

/**
 * Initializes authentication protection:
 * If no valid session exists, immediately blocks the UI with the login screen.
 */
export async function initSystemAuth() {
    setupAuthEventListeners();

    const isGuest = localStorage.getItem('grimheim_guest_mode') === 'true';
    if (isGuest) {
        hideBlockingLoginScreen();
        updateAuthUI({ id: 'guest', username: 'Invitado (Local)', is_guest: true });
        setUserId('local');
        setUseLocalStorage(true);
        return;
    }

    const firebaseUid = localStorage.getItem('grimheim_firebase_user');
    if (firebaseUid) {
        // Firebase is restoring session asynchronously, keep auth-verified
        document.documentElement.classList.add('auth-verified');
        hideBlockingLoginScreen();
        return;
    }

    const storedToken = getStoredToken();
    if (storedToken) {
        const user = await apiGetMe();
        if (user) {
            hideBlockingLoginScreen();
            updateAuthUI(user);
            return;
        }
    }

    showBlockingLoginScreen();
    updateAuthUI(null);
}

/**
 * Opens and renders the Admin User Management Modal
 */
export async function openAdminUsersModal() {
    const modal = document.getElementById('admin-users-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    resetUserForm();
    await loadAndRenderUsersTable();
}

/**
 * Closes the Admin User Management Modal
 */
export function closeAdminUsersModal() {
    const modal = document.getElementById('admin-users-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
    resetUserForm();
}

/**
 * Fetches and populates the table of users
 */
async function loadAndRenderUsersTable() {
    const tbody = document.getElementById('admin-users-table-body');
    const loadingEl = document.getElementById('admin-users-loading');
    if (!tbody) return;

    if (loadingEl) loadingEl.classList.remove('hidden');
    tbody.innerHTML = '';

    try {
        const users = await apiGetUsers();
        if (loadingEl) loadingEl.classList.add('hidden');

        if (!users || users.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-slate-400 italic">No se han encontrado usuarios registrados.</td></tr>`;
            return;
        }

        const currentUser = getStoredUser();

        tbody.innerHTML = users.map(u => {
            const isSelf = currentUser && currentUser.id === u.id;
            const roleBadge = u.is_superuser
                ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-mordheim-gold border border-mordheim-gold/40"><i class="fas fa-crown text-[10px] mr-1"></i>Superusuario</span>`
                : `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">Estándar</span>`;

            const dateStr = u.created_at ? new Date(u.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) : '-';

            return `
                <tr class="border-b border-slate-700 hover:bg-slate-750 transition">
                    <td class="py-3 px-3 text-slate-400 font-mono text-xs">#${u.id}</td>
                    <td class="py-3 px-3 font-semibold text-white">
                        ${escapeHtml(u.username)}
                        ${isSelf ? '<span class="text-xs text-mordheim-gold ml-1.5 font-normal">(Tu cuenta)</span>' : ''}
                    </td>
                    <td class="py-3 px-3">${roleBadge}</td>
                    <td class="py-3 px-3 text-xs text-slate-400">${dateStr}</td>
                    <td class="py-3 px-3 text-right space-x-1">
                        <button
                            type="button"
                            class="admin-edit-user-btn px-2.5 py-1 text-xs bg-slate-600 hover:bg-slate-500 text-white rounded font-medium transition inline-flex items-center"
                            data-id="${u.id}"
                            data-username="${escapeHtml(u.username)}"
                            data-superuser="${u.is_superuser ? 'true' : 'false'}"
                            title="Editar usuario o cambiar contraseña"
                        >
                            <i class="fas fa-edit mr-1 text-yellow-300"></i> Modificar
                        </button>
                        ${!isSelf ? `
                            <button
                                type="button"
                                class="admin-delete-user-btn px-2.5 py-1 text-xs bg-red-900/60 hover:bg-red-800 text-red-200 rounded font-medium transition inline-flex items-center"
                                data-id="${u.id}"
                                data-username="${escapeHtml(u.username)}"
                                title="Eliminar este usuario"
                            >
                                <i class="fas fa-trash-alt mr-1"></i> Eliminar
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `;
        }).join('');

        // Attach action handlers
        tbody.querySelectorAll('.admin-edit-user-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const username = btn.dataset.username;
                const isSuperuser = btn.dataset.superuser === 'true';
                populateEditForm(id, username, isSuperuser);
            });
        });

        tbody.querySelectorAll('.admin-delete-user-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                const username = btn.dataset.username;
                if (confirm(`¿Estás seguro de que deseas eliminar permanentemente al usuario "${username}"?`)) {
                    try {
                        await apiDeleteUser(id);
                        showAdminFeedback(`Usuario "${username}" eliminado con éxito.`, 'success');
                        await loadAndRenderUsersTable();
                    } catch (err) {
                        showAdminFeedback(err.message, 'error');
                    }
                }
            });
        });

    } catch (err) {
        if (loadingEl) loadingEl.classList.add('hidden');
        tbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-red-400">Error: ${escapeHtml(err.message)}</td></tr>`;
    }
}

/**
 * Fills the user form for editing
 */
function populateEditForm(id, username, isSuperuser) {
    const formTitle = document.getElementById('admin-form-title');
    const idInput = document.getElementById('admin-user-id');
    const usernameInput = document.getElementById('admin-user-username');
    const passwordInput = document.getElementById('admin-user-password');
    const passwordHelp = document.getElementById('admin-password-help');
    const superuserCheckbox = document.getElementById('admin-user-is-superuser');
    const submitBtn = document.getElementById('admin-form-submit-btn');

    if (formTitle) formTitle.textContent = `Modificar Usuario: ${username}`;
    if (idInput) idInput.value = id;
    if (usernameInput) usernameInput.value = username;
    if (passwordInput) {
        passwordInput.value = '';
        passwordInput.required = false;
        passwordInput.placeholder = '•••••••• (Dejar en blanco para no cambiar)';
    }
    if (passwordHelp) {
        passwordHelp.textContent = 'Deja la contraseña en blanco si no deseas cambiarla. Si escribes una nueva, se encriptará de forma segura.';
        passwordHelp.classList.remove('hidden');
    }
    if (superuserCheckbox) superuserCheckbox.checked = Boolean(isSuperuser);
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-save mr-1.5"></i> Actualizar Usuario';
    }

    const formWrapper = document.getElementById('admin-user-form-wrapper');
    if (formWrapper) {
        formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Resets the user creation/edit form back to "New User" state
 */
export function resetUserForm() {
    const formTitle = document.getElementById('admin-form-title');
    const idInput = document.getElementById('admin-user-id');
    const usernameInput = document.getElementById('admin-user-username');
    const passwordInput = document.getElementById('admin-user-password');
    const passwordHelp = document.getElementById('admin-password-help');
    const superuserCheckbox = document.getElementById('admin-user-is-superuser');
    const submitBtn = document.getElementById('admin-form-submit-btn');
    const feedbackEl = document.getElementById('admin-users-feedback');

    if (formTitle) formTitle.textContent = 'Crear Nuevo Usuario';
    if (idInput) idInput.value = '';
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) {
        passwordInput.value = '';
        passwordInput.required = true;
        passwordInput.placeholder = 'Introduce una contraseña segura';
    }
    if (passwordHelp) passwordHelp.classList.add('hidden');
    if (superuserCheckbox) superuserCheckbox.checked = false;
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-user-plus mr-1.5"></i> Guardar Usuario';
    }
    if (feedbackEl) {
        feedbackEl.classList.add('hidden');
        feedbackEl.textContent = '';
    }
}

function showAdminFeedback(message, type = 'info') {
    const feedbackEl = document.getElementById('admin-users-feedback');
    if (!feedbackEl) return;

    feedbackEl.textContent = message;
    feedbackEl.classList.remove('hidden', 'bg-green-900/50', 'text-green-300', 'border-green-600', 'bg-red-900/50', 'text-red-300', 'border-red-600');

    if (type === 'success') {
        feedbackEl.classList.add('bg-green-900/50', 'text-green-300', 'border', 'border-green-600');
    } else {
        feedbackEl.classList.add('bg-red-900/50', 'text-red-300', 'border', 'border-red-600');
    }
}

/**
 * Wires all authentication and admin panel event listeners
 */
function setupAuthEventListeners() {
    let currentAuthMode = 'login';
    const tabLogin = document.getElementById('system-tab-login');
    const tabRegister = document.getElementById('system-tab-register');
    const authTitle = document.getElementById('system-auth-title');
    const authSubtitle = document.getElementById('system-auth-subtitle');
    const submitBtn = document.getElementById('system-login-submit-btn');

    const setAuthMode = (mode) => {
        currentAuthMode = mode;
        const errorDiv = document.getElementById('system-login-error');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.classList.add('hidden');
        }

        if (mode === 'login') {
            if (tabLogin) {
                tabLogin.className = 'flex-1 py-2 text-xs font-semibold rounded-lg bg-white/10 text-white transition';
            }
            if (tabRegister) {
                tabRegister.className = 'flex-1 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
            }
            if (authTitle) authTitle.textContent = 'Acceso a Grimheim';
            if (authSubtitle) authSubtitle.textContent = 'Sincroniza tus bandas automáticamente en la nube';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i> Iniciar Sesión';
            }
        } else {
            if (tabRegister) {
                tabRegister.className = 'flex-1 py-2 text-xs font-semibold rounded-lg bg-white/10 text-white transition';
            }
            if (tabLogin) {
                tabLogin.className = 'flex-1 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white transition';
            }
            if (authTitle) authTitle.textContent = 'Crear Cuenta en Grimheim';
            if (authSubtitle) authSubtitle.textContent = 'Guarda y sincroniza tus bandas gratis en la nube';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-user-plus mr-2"></i> Crear Cuenta';
            }
        }
    };

    tabLogin?.addEventListener('click', () => setAuthMode('login'));
    tabRegister?.addEventListener('click', () => setAuthMode('register'));

    // Blocking login/register form submission
    const loginForm = document.getElementById('system-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('system-login-username');
            const passwordInput = document.getElementById('system-login-password');

            const email = usernameInput ? usernameInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value : '';

            if (!email || !password) {
                showBlockingLoginScreen('Por favor, introduce tu correo y contraseña.');
                return;
            }

            if (currentAuthMode === 'register' && password.length < 6) {
                showBlockingLoginScreen('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Procesando...';
            }

            try {
                let userRecord = null;
                if (currentAuthMode === 'login') {
                    const result = await loginWithEmailPassword(email, password);
                    userRecord = result.user;
                } else {
                    const result = await registerWithEmailPassword(email, password);
                    userRecord = result.user;
                }

                if (userRecord) {
                    localStorage.setItem('grimheim_firebase_user', userRecord.uid);
                    localStorage.removeItem('grimheim_guest_mode');
                    setUserId(userRecord.uid);
                    setUseLocalStorage(false);
                    hideBlockingLoginScreen();
                    updateAuthUI({
                        id: userRecord.uid,
                        username: userRecord.email,
                        email: userRecord.email,
                        is_superuser: false
                    });
                    if (passwordInput) passwordInput.value = '';
                    listenToWarbands();
                    showListView(getWarbands());
                    window.dispatchEvent(new CustomEvent('grimheim:auth-success', { detail: { uid: userRecord.uid, email: userRecord.email } }));
                }
            } catch (err) {
                // If on local node backend without firebase connection, fallback to local node apiLogin
                if (currentAuthMode === 'login' && (!err.code || err.code === 'auth/network-request-failed')) {
                    try {
                        const nodeResult = await apiLogin(email, password);
                        hideBlockingLoginScreen();
                        updateAuthUI(nodeResult.user);
                        if (passwordInput) passwordInput.value = '';
                        listenToWarbands();
                        showListView(getWarbands());
                        window.dispatchEvent(new CustomEvent('grimheim:auth-success', { detail: nodeResult.user }));
                        return;
                    } catch (nodeErr) {
                        // ignore and display formatted error
                    }
                }
                showBlockingLoginScreen(formatAuthError(err));
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = currentAuthMode === 'login'
                        ? '<i class="fas fa-sign-in-alt mr-2"></i> Iniciar Sesión'
                        : '<i class="fas fa-user-plus mr-2"></i> Crear Cuenta';
                }
            }
        });
    }

    // Google Sign-in button
    const googleBtn = document.getElementById('system-login-google-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            googleBtn.disabled = true;
            const originalHtml = googleBtn.innerHTML;
            googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Conectando...';

            try {
                const res = await loginWithGoogle();
                if (res && res.user) {
                    localStorage.setItem('grimheim_firebase_user', res.user.uid);
                    localStorage.removeItem('grimheim_guest_mode');
                    setUserId(res.user.uid);
                    setUseLocalStorage(false);
                    hideBlockingLoginScreen();
                    updateAuthUI({
                        id: res.user.uid,
                        username: res.user.displayName || res.user.email,
                        email: res.user.email,
                        is_superuser: false
                    });
                    listenToWarbands();
                    showListView(getWarbands());
                    window.dispatchEvent(new CustomEvent('grimheim:auth-success', { detail: { uid: res.user.uid, email: res.user.email } }));
                }
            } catch (err) {
                if (err.code !== 'auth/popup-closed-by-user') {
                    showBlockingLoginScreen(formatAuthError(err));
                }
            } finally {
                googleBtn.disabled = false;
                googleBtn.innerHTML = originalHtml;
            }
        });
    }

    // Guest Mode button
    const guestBtn = document.getElementById('system-login-guest-btn');
    if (guestBtn) {
        guestBtn.addEventListener('click', () => {
            localStorage.setItem('grimheim_guest_mode', 'true');
            localStorage.removeItem('grimheim_firebase_user');
            setUserId('local');
            setUseLocalStorage(true);
            hideBlockingLoginScreen();
            updateAuthUI({
                id: 'guest',
                username: 'Invitado (Local)',
                email: '',
                is_guest: true
            });
            listenToWarbands();
            showListView(getWarbands());
        });
    }

    // Toggle password visibility button on login screen
    const togglePassBtn = document.getElementById('toggle-login-password-visibility');
    if (togglePassBtn) {
        togglePassBtn.addEventListener('click', () => {
            const passInput = document.getElementById('system-login-password');
            const icon = togglePassBtn.querySelector('i');
            if (passInput) {
                if (passInput.type === 'password') {
                    passInput.type = 'text';
                    if (icon) {
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    }
                } else {
                    passInput.type = 'password';
                    if (icon) {
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    }
                }
            }
        });
    }

    // Logout buttons
    const handleLogout = async () => {
        if (confirm('¿Deseas cerrar tu sesión? Se bloqueará la aplicación hasta que vuelvas a identificarte.')) {
            try {
                await firebaseLogout();
            } catch (e) {
                console.warn('Firebase logout notice:', e);
            }
            try {
                await apiLogout();
            } catch (e) {
                // ignore
            }
            unsubscribeFromWarbands();
            localStorage.removeItem('grimheim_firebase_user');
            localStorage.removeItem('grimheim_guest_mode');
            clearStoredSession();
            setUserId('local');
            setUseLocalStorage(true);
            updateAuthUI(null);
            showBlockingLoginScreen();
        }
    };

    const logoutBtn = document.getElementById('system-logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    const mobileLogoutBtn = document.getElementById('mobile-system-logout-btn');
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);

    // Open Admin Modal buttons
    const adminBtn = document.getElementById('admin-users-btn');
    if (adminBtn) adminBtn.addEventListener('click', openAdminUsersModal);

    const mobileAdminBtn = document.getElementById('mobile-admin-users-btn');
    if (mobileAdminBtn) {
        mobileAdminBtn.addEventListener('click', () => {
            // Close mobile menu first
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
            openAdminUsersModal();
        });
    }

    // Close Admin Modal buttons
    const closeAdminBtn = document.getElementById('close-admin-users-modal-btn');
    if (closeAdminBtn) closeAdminBtn.addEventListener('click', closeAdminUsersModal);

    const cancelAdminBtn = document.getElementById('admin-cancel-btn');
    if (cancelAdminBtn) cancelAdminBtn.addEventListener('click', closeAdminUsersModal);

    const resetFormBtn = document.getElementById('admin-reset-form-btn');
    if (resetFormBtn) resetFormBtn.addEventListener('click', resetUserForm);

    // Admin User Form submit (create or update)
    const adminUserForm = document.getElementById('admin-user-form');
    if (adminUserForm) {
        adminUserForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('admin-user-id')?.value;
            const username = document.getElementById('admin-user-username')?.value.trim();
            const password = document.getElementById('admin-user-password')?.value;
            const isSuperuser = document.getElementById('admin-user-is-superuser')?.checked;
            const submitBtn = document.getElementById('admin-form-submit-btn');

            if (!username) {
                showAdminFeedback('El nombre de usuario es obligatorio.', 'error');
                return;
            }

            if (!id && (!password || password.length < 3)) {
                showAdminFeedback('Para un usuario nuevo, la contraseña debe tener al menos 3 caracteres.', 'error');
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Guardando...';
            }

            try {
                if (id) {
                    // Update
                    const updatePayload = {
                        username,
                        is_superuser: isSuperuser
                    };
                    if (password) {
                        updatePayload.password = password;
                    }
                    await apiUpdateUser(id, updatePayload);
                    showAdminFeedback(`Usuario "${username}" actualizado con éxito (contraseña encriptada).`, 'success');
                } else {
                    // Create
                    await apiCreateUser({
                        username,
                        password,
                        is_superuser: isSuperuser
                    });
                    showAdminFeedback(`Usuario "${username}" creado con éxito (contraseña encriptada).`, 'success');
                }

                resetUserForm();
                await loadAndRenderUsersTable();

                // If updating own username or role, update header UI
                const currentUser = getStoredUser();
                if (id && currentUser && String(currentUser.id) === String(id)) {
                    const refreshedMe = await apiGetMe();
                    if (refreshedMe) updateAuthUI(refreshedMe);
                }
            } catch (err) {
                showAdminFeedback(err.message, 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = id
                        ? '<i class="fas fa-save mr-1.5"></i> Actualizar Usuario'
                        : '<i class="fas fa-user-plus mr-1.5"></i> Guardar Usuario';
                }
            }
        });
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
