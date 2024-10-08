import { Outlet } from '@remix-run/react'
import { MainWrapper } from '../../components/wrappers'

export default function StoreLayout() {
    return (
        <MainWrapper className="justify-center p-3">
            <Outlet />
        </MainWrapper>
    )
}
