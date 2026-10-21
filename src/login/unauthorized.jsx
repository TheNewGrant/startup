
export function Unauthorized() {
    

    return (
        <div>
            <div className="input-section">
                <label htmlFor="identify">Email:</label>
                <input id="identify" type="text" placeholder="your@email.com" />
            </div>
            <div className="input-section">
                <label htmlFor="id-pass">Password:</label>
                <input id="id-pass" type="password" placeholder="password" />
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