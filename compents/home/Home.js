import React from 'react'
import bannerImg from '../../Images/banner-1.png'
import gridImg2 from '../../Images/grid2.png'
import gridImg1 from '../../Images/grid1.png'
const Home = () => {
    return (
        <section>
            <div className="container-fluid topContentBg">
                <div className="row row-cols-1 row-cols-md-2 py-5">
                    <div className="col ">
                        <div className="topContentLeft">
                            <img src={bannerImg} className="img-fluid d-inline-block" alt="banner-img" />
                            <img src={gridImg1} classname="img-fluid" alt='gridImg' />

                        </div>
                    </div>
                    <div className="col">
                        <div className="topContet-right">
                            <img src={gridImg2} className="img-fluid" alt="grid-logo" />
                            <div className="topContent-right-text">
                                <h1>Create Your <span className="text-pink fw-bold">NFT</span></h1>
                                <h1>Dream Gallery</h1>
                                <p className="pt-4 text-white-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                                    maxime amet,
                                    quo
                                    mplicabo dolorum quos fugit </p>
                            </div>
                            <div className="pt-4">
                                <button type="button" className="me-4 topContentBtn">Explore Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Home