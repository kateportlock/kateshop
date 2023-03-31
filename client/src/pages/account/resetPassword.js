const ResetPasswordPage = (props) => {

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div>
            {
                currentPath === '/account/login' ? (
                    <Login />
                ) : (
                    <Register />
                )
            }
        </div>
    )
}

export default ResetPasswordPage;