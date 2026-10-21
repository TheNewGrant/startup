import { useNavigate } from "react-router-dom";

export function Authorized(input) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userName");
    input.onLogout();
  }

  return (
      <div className = "bg-gray-300">
        <div className = "player-name">{input.userName}</div>
        <Button id = "login" 
            className = "bg-red-400 dark:bg-amber-500 text-white" 
            type = "submit" 
            onClick = {() => navigate('/play')}>
          Play
        </Button>
        <Button id = "create" 
            className = "bg-red-400 dark:bg-amber-500 text-white" 
            type = "submit"
            onClick = {() => logout()}>
          Logout
        </Button>
      </div>
  );
}