import { Outlet } from '@remix-run/react'

export default function StoreLayout() {
    return (
        <main className="w-full h-full min-h-screen flex flex-col items-center justify-center p-3">
            <Outlet />
        </main>
    )
}
