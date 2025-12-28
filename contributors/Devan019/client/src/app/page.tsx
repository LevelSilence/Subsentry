"use client"
import { SignInButton, SignOutButton, SignUpButton, UserAvatar, UserProfile } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';

const page = () => {

  const { isSignedIn,isLoaded } = useUser();

  if(!isLoaded){
    return (
      <div>Loading</div>
    )
  }

  return (
    <div>
      {isSignedIn ? 
        <div className='flex justify-center gap-4'>
          <UserAvatar />
          <SignOutButton />
          <Link href={"/dashboard"}>Dashboard</Link>
        </div>
      : <div className='flex justify-center gap-4'>
        <SignUpButton />
        <SignInButton />
      </div>}
    </div>
  )
}

export default page