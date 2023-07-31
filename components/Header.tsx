import Link from "next/link";
import Image from "next/image";
import {NavLinks} from "@/constance";
import AuthProviders from "@/components/AuthProviders";
import {getCurrentUser} from "@/lib/session";
import ProfileMenu from "@/components/ProfileMenu";


const Header = async () => {
    const session = await getCurrentUser()
    return (
        <header>
            <nav className='flexBetween navbar'>
                <div className='flex-1 flexStart gap-10'>
                    <Link href='/'>
                        <Image src='/logo.svg' alt='Flexibble' width={115} height={43}/>
                    </Link>
                    <ul className='xl:flex hidden text-small gap-7'>
                        {NavLinks.map((link) => (
                            <Link href={link.href} key={link.key}>{link.text}</Link>
                        ))}
                    </ul>
                </div>
                <div className='flexCenter gap-4'>
                    {session?.user ? (
                        <>
                            <ProfileMenu session={session}/>
                            <Link href='/create-project'>
                                Share Work
                            </Link>

                        </>
                    ) : (
                        <AuthProviders/>
                    )}
                </div>

            </nav>
        </header>
    );
}

export default Header;