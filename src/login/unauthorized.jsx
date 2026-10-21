
export function Unauthorized() {
    return (
        <form className="bg-gray-300" method="get" onSubmit={handleSubmit}>
          <div className="input-section">
            <label htmlFor="identify">Email:</label>
            <input id="identify" type="text" placeholder="your@email.com" />
          </div>
          <div className="input-section">
            <label htmlFor="id-pass">Password:</label>
            <input id="id-pass" type="password" placeholder="password" />
          </div>
          <button id="login" className="bg-red-400 dark:bg-amber-500 text-white" type="submit">Login</button>
          <button id="create" className="bg-red-400 dark:bg-amber-500 text-white" type="submit">Create</button>
        </form>
    )
}