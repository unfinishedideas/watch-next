function LoginForm()
{
    return(
        <div>
            <form>
                <label>
                    Username: <input name="usernameInput"/>
                </label>
                <br/>
                <label>
                    Password: <input name="passwordInput"/>
                </label>
                <br/>
                <button type="submit">Go</button>
            </form>
        </div>
    )
}

export default LoginForm;
