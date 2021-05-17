import { IconButton, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: 15,
        right: 15,
    },
    arrowIcon: {
        borderRadius: 20,
    }
}))

export default function ScroolToTopArrow() {
    const classes = useStyles();
    const [displayButton, setDisplayButton] = useState(false);

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 300) {
            setDisplayButton(true);
        } else {
            setDisplayButton(false);
        }
    })

    const handleClick = () => {
       window.scrollTo({top: 0, behavior: "smooth"})
    }

    return (
        <>
            {displayButton ? <IconButton className={classes.root} onClick={handleClick}>
                <ArrowUpwardRoundedIcon className={classes.arrowIcon} color="secondary" aria-label="scroll to top" />
            </IconButton> : ""}
        </>
    );
} 