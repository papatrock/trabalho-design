// local storage pra gerenciar autenticação

const Auth = {
    login: (usuario) => {
        localStorage.setItem('usuario_logado', JSON.stringify(usuario));
    },

    logout: () => {
        localStorage.removeItem('usuario_logado');
        window.location.href = '/login.html';
    },

    getUser: () => {
        const userStr = localStorage.getItem('usuario_logado');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    },

    getUserId: () => {
        const user = Auth.getUser();
        return user ? user.id : null;
    },

    getRole: () => {
        const user = Auth.getUser();
        return user ? user.role : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('usuario_logado');
    },

    // fazer controle de rotas autenticadas aqui
    requireAuth: () => {
        if (!Auth.isAuthenticated()) {
            window.location.href = '/index.html';
        }
    },
    redirectIfAuthenticated: () => {
        if (Auth.isAuthenticated()) {
            window.location.href = '/espacos.html';
        }
    }
};

window.Auth = Auth;