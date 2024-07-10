"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {

    const toggleMobileNav = function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        document.querySelector('.navbar-burger')?.classList.toggle('is-active');
        document.querySelector('.navbar-menu')?.classList.toggle('is-active');
    }

    const unToggleMobileNav = () => {
        document.querySelector('.navbar-burger')?.classList.remove('is-active');
        document.querySelector('.navbar-menu')?.classList.remove('is-active');
    }

    //all Nav Items
    const navItems = {
        'Home': '/',
        'About': '/about',
        'Services': '/services',
        'Contact': '/contact'
    }

    const [currentUrl, setCurrentUrl] = useState('/');

    useEffect(() => {
        if (typeof window !== "undefined" && typeof window.location !== "undefined") {
            setCurrentUrl(window.location.pathname)
        }
    }, [])

    //Modal

    const [isModalActive, setIsModalActive] = useState(false)

    return (
        <>
            {/* hide-on-mobile hide-on-tablet */}
            <nav className="navbar is-align-items-center" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a href="/" className="navbar-brand-link">
                        <Image src={"/brand-logo.svg"} alt={"Simon Ugorji"} width={"80"} height={"30"} />
                    </a>
                </div>
            </nav>
        </>
    )
}