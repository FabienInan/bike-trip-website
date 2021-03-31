import React from 'react';
import Slider from 'react-slick';
import { makeStyles } from '@material-ui/core';
import { theme } from '../../ui-utils/theme';

const useStyles = makeStyles(() => ({
    image: {
        width: 440, 
        margin:'0 auto',
        [theme.breakpoints.down('xs')]: {
        width: 260,
        }
    }
  }));

export function Fade(props) {

    const classes = useStyles();

    const {urlArray} = props;
    
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,

    };

    return (
        <Slider {...settings}>
            {
                urlArray.map((url, index) => {
                    return (
                        <div>
                        <img className={classes.image} alt={`img${index}`} src={url} />
                      </div>
                    );
                })
            }
      </Slider>
    )
};