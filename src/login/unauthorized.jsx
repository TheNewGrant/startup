
export function Unauthorized(input) {
    const [userName, setUserName] = React.useState(input.userName);
    const [password, setPassword] = React.useState("");

    async function loginUser() {
        localStorage.setItem('userName', userName);
        input.onLogin(userName);
    }
    
    async function createUser() {
        localStorage.setItem('userName', userName);
        input.onLogin(userName);
    }

    return (
        <div>
            <div className="input-section">
                <label htmlFor="identify">Email:</label>
                <input id="identify" 
                type="text" 
                placeholder="your@email.com" 
                value = {userName}
                onChange = {(e) => setUserName(e.target.value)} />
            </div>
            <div className="input-section">
                <label htmlFor="id-pass">Password:</label>
                <input id="id-pass" 
                type="password" 
                placeholder="password" 
                value = {password}
                onChange = {(e) => setPassword(e.target.value)} />
            </div>
            <Button id="login" 
                    className="bg-red-400 dark:bg-amber-500 text-white" 
                    type="submit"
                    onClick = {() => loginUser()}>
                Login
            </Button>
            <Button id="create" 
                    className="bg-red-400 dark:bg-amber-500 text-white" 
                    type="submit"
                    onClick = {() => createUser()}>
                Create
            </Button>
        </div>
    )
}