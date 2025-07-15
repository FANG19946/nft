import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence, useMotionTemplate } from 'motion/react'


export default function Navbar(props) {

    const { isMenuOpen, setIsMenuOpen } = props

    // toggle menu overlay animation consts
    const y = useMotionValue(-50);
    const blur = useTransform(y, [-50, -10], [0, 12]);
    const backdropFilter = useMotionTemplate`blur(${blur}px)`;
    const bgOpacity = useTransform(y, [-5, 0], [0, 0.5]); // 0 to 0.5 opacity
    const backgroundColor = useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`

    //tracking y value and locking overlay on screen
    useEffect(() => {
        // Animate Y value
        y.set(isMenuOpen ? 0 : -50);

        // Lock scroll when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup just in case (safety net)
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen, y]);



    return (



        <header className=' grid grid-cols-3 items-center p-3  text-black  sticky  z-10 top-0'>
            <a href="#" className='w-28 justify-self-start col-start-1 relative z-20'>
                <img src="\images\CA3.0_Logo_1.png" alt="Logo" className='relative z-20' />
            </a>

            <ul className="hidden lg:flex justify-self-center space-x-4 col-start-2">
                <li className="hover:text-white hover:bg-amber-800 px-4 py-2 rounded-3xl bg-amber-200 cursor-pointer ">About</li>
                <li className="hover:text-white hover:bg-amber-800 px-4 py-2 rounded-3xl bg-amber-200 cursor-pointer ">Home</li>
                <li className="hover:text-white hover:bg-amber-800 px-4 py-2 rounded-3xl bg-amber-200 cursor-pointer ">Contact</li>
            </ul>

            <div className='lg:hidden w-8 h-8 flex justify-self-end  col-start-3 mr-1.5 relative z-20' >
                <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}

                    animate={{ x: isMenuOpen ? 10 : 0 }}  // Moves 10px right when clicked
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative w-full h-full flex justify-center items-center p-0 border-0  "

                >
                    {/* Top Line */}
                    <motion.span
                        initial={false}
                        animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className=" absolute w-full h-1 p-0 bg-gray-800 rounded-2xl"
                    />

                    {/* Bottom Line */}
                    <motion.span
                        initial={false}
                        animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className=" absolute w-full h-1 p-0 bg-gray-800 rounded-2xl"
                    />
                </motion.button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (<motion.div className={`inset-0 pt-20 absolute lg:hidden w-full h-screen   border border-white/70 shadow-lg flex flex-col gap-3 text-lg transform transition-transform justify-start items-start text-left p-3 z-10 `}
                    initial={{ y: "-50px", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "50px", opacity: 0 }}
                    style={{
                        y,                     // Shift down 50px
                        backdropFilter,
                        backgroundColor,

                    }}
                    transition={{
                        delay: 0.04,
                        duration: 0.1
                    }}


                >
                    <motion.div>
                        <motion.li className='list-none w-full  cursor-pointer text-xl py-2 text-left font-bold '
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.7 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 50,
                                duration: 0.1,
                                delay: 0.1
                            }}
                            style={{
                                transformOrigin: "center"  // Ensures it grows from the center, not from a corner
                            }}

                        >ABOUT</motion.li>
                        <motion.li className='list-none w-full  cursor-pointer text-xl py-2 text-left font-bold'
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.7 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 50,
                                duration: 0.1,
                                delay: 0.1
                            }}
                            style={{
                                transformOrigin: "center"  // Ensures it grows from the center, not from a corner
                            }}>HOME</motion.li>
                        <motion.li className='list-none w-full  cursor-pointer text-xl py-2 text-left font-bold'
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.7 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 50,
                                duration: 0.1,
                                delay: 0.1
                            }}
                            style={{
                                transformOrigin: "center"  // Ensures it grows from the center, not from a corner
                            }}>CONTACT</motion.li>
                    </motion.div>

                </motion.div>)}

            </AnimatePresence>




        </header>




    )
}
