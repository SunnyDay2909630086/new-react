import React from 'react';
import { Card, Carousel } from 'antd';
const contentStyle = {
  height: '240px',
  width: '100%',
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
  overflow: 'hidden'
};
const UICarousel = () => (
    <Card title='轮播图' style={{margin: '10px'}} >
        <Carousel autoplay effect='fade'>
            <div>
                <img src='/assets/carousel-img/1.jpg' alt='1' style={contentStyle} />
            </div>
            <div>
                <img src='/assets/carousel-img/2.jpg' alt='2' style={contentStyle} />
            </div>
            <div>
                <img src='/assets/carousel-img/3.jpg' alt='3' style={contentStyle} />
            </div>
        </Carousel>
    </Card>
);

export default UICarousel;