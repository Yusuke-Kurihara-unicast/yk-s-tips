/**
 * action
 * Routeで指定したコンポーネント内でSubmitが発生すると実行する関数を指定する
 */
<Route path="/login" element={<Login />} action={loginAction} />

// Loginコンポーネント例
import { Form, redirect, useActionData } from 'react-router-dom'

export const loginAction = async ({ request }) => {
    // フォームデータを取得
    const formData = await request.formData();
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        //認証の処理 (email, password) => boolean
        const isAuth = await isCheckLogin(email, password);
        //認証成功時: ルートにリダイレクト
        if (isAuth) return redirect("/")
        return { error: "Invalid credentials" };
    } catch (error) {
        return { error: "Login failed. Please try again." };
    }
}
export const Login = () => {
    // アクションからのデータ（エラーメッセージなど）を取得
    const actionData = useActionData();
    return (
        <div>
            <h1>Login</h1>
            {/* Formコンポーネントを使用する */}
            <Form method='post'>{/**methodの記述大事 */}
                <div>
                    <input type="email" name='email' />
                </div>
                <div>
                    <input type="password" name='password' />
                </div>
                {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}