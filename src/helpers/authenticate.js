const authenticate = ()=> localStorage.getItem("lkti");
const logout = ()=>{
    localStorage.clear();
};

export {
    logout,
    authenticate
};
