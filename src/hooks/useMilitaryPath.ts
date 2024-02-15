import { usePathname } from "next/navigation"

export const useMilitaryPath = () => {
    const pathName = usePathname()
    return pathName.includes('military')
}