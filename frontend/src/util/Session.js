export const Session = {
    //Set the current user in localStorage
    setUser: function(userData) {
        localStorage.setItem('curUser', JSON.stringify(userData))
    },

    //Get and return the current user from localStorage 
    getCurUser: function() {
        const data = localStorage.getItem('curUser')
        return data ? JSON.parse(data) : null
    },

    //Return true if there is a curUser - meaning there is a user logged in
    isLoggedIn: function() {
        const data = localStorage.getItem('curUser')
        return (data) ? true : false
    },

    //Log out the user - remove from localStorage
    logout: function() {
        localStorage.removeItem('curUser')
        window.location.href = "/"
    }
}