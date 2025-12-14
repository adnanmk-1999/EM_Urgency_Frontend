function isAdmin() {
    if (localStorage.getItem('accessToken')) {
        var x = localStorage.getItem('roles');
        if (x === 'Role:ADMIN,Role:USER' || 'Role:USER,Role:ADMIN') {
            return true;
        }
    }
    else {
        return false;
    }
}

function isUser() {
    if (localStorage.getItem('accessToken')) {
        var x = localStorage.getItem('roles');
        if (x === 'Role:ADMIN,Role:USER' || 'Role:USER') {
            return true;
        }
    }
    else {
        return false;
    }
}

var roleController = {
    isAdmin: isAdmin,
    isUser: isUser,
}

module.exports = roleController;