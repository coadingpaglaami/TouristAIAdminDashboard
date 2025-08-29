'use client';
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const Home = () => {
    const router=useRouter();
return(
    <Button type="button" variant="default" className="orange p-2 rounded-lg text-white text-sm tracking-wider hover:bg-orange-600"
    onClick={()=>router.push('/admin/login')}>
Go To Log In Page
    </Button>
)
}
