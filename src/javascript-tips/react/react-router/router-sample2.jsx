/**
 * loader
 * コンポーネントを読み出す前の処理がかける。lodaderの戻り値をuseLoaderDataで取得できる
 */
// 例）Home コンポーネントを読み出す前に homeLoader で認証情報を確認し、認証されていない場合はログイン画面にリダイレクト
<Route path="/" element={<Home />} loader={homeLoader} />

// Homeコンポーネント例
import React from 'react'
import { redirect, useLoaderData } from 'react-router';

export const homeLoader = async () => {
    const user = await checkAuthStatus(); //認証情報を取得
    if (!user) return redirect("/login") //認証されていなかったらリダイレクト
    return { user }
}
export const Home = () => {
    const { user } = useLoaderData() //userを取得する
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome, {user.name}!</p>
        </div>
    )
}