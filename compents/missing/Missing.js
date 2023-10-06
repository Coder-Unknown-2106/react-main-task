import React from 'react'
import './missing.css'
const Missing = () => {
    return (
        <div >
            <div className='miisingComponenet'>
                <p >
                    <header className="top-header">
                    </header>
                    {/*dust particel*/}
                    <div>
                        <div className="starsec" />
                        <div className="starthird" />
                        <div className="starfourth" />
                        <div className="starfifth" />
                    </div>
                    {/*Dust particle end-*/}
                    <div className="lamp__wrap">
                        <div className="lamp">
                            <div className="cable" />
                            <div className="cover" />
                            <div className="in-cover">
                                <div className="bulb" />
                            </div>
                            <div className="light" />
                        </div>
                    </div>
                    {/* END Lamp */}
                </p><section className="error"><p >
                    {/* Content */}
                </p><div className="error__content"><p >
                    <div className="error__message message text-white">
                        <h1 className="message__title">Page Not Found</h1>
                        <p className="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
                    </div>
                </p><div className="error__nav e-nav"><p >
                </p><button href="http://www.thedresscounter.com" target="_blanck" className="e-nav__link" />
                        </div>
                    </div>
                    {/* END Content */}
                </section>
            </div>

        </div>
    )
}

export default Missing
