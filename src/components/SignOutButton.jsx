'use client'
import { logout } from "../../lib/actions/auth";

export default function SignOutButton() {
  return (
    <button onClick={() => logout()} className="text-white bg-red-400 rounded-xl">
        Log out
    </button>
  )
}
