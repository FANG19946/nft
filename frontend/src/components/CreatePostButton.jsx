import React from 'react'

import { motion } from 'framer-motion'

export default function CreatePostButton({ onClick }) {

    return (
        <motion.button
            onClick={onClick}

            initial="rest"
            whileHover="hover"
            whileTap="tap"

            variants={{
                rest: {
                    scale: 1,
                },

                hover: {
                    scale: 1.08,
                },

                tap: {
                    scale: 0.92,
                },
            }}

            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 15,
            }}

            className="
                fixed
                bottom-6
                right-6
                z-50

                w-20
                h-20

                rounded-full

                bg-black/40
                backdrop-blur-md

                border
                border-white/10

                shadow-2xl
            "
        >

            <motion.img
                src="/images/spraycan.png"
                alt="Spray Can"

                draggable={false}

                variants={{
                    rest: {
                        y: 0,
                        rotate: 0,
                    },

                    hover: {
                        y: [0, -6, 4, -4, 2, 0],
                        rotate: [0, -4, 4, -3, 3, 0],
                    },

                    tap: {
                        y: 2,
                        rotate: -8,
                    },
                }}

                transition={{
                    duration: 0.45,
                }}

                className="
                    w-full
                    h-full
                    object-contain
                    p-2

                    pointer-events-none
                    select-none
                "
            />

        </motion.button>
    )
}