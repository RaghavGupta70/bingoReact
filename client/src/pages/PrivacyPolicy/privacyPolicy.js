import react from 'react';
import privacyStyles from './privacyStyles.module.css';

const Privacy = () => {
    return(<>
    <div className={privacyStyles.body}>
            <h1>
                Bingo Privacy Policy
            </h1>
            <p>
                    Policy Effective: Oct 25 2021

                    This Privacy Policy describes the personal data we collect and why, how we use that data and your rights.

                    This Privacy Policy applies to Binod Bingo website related services, which we here collectively call the “Service”. This Privacy Policy may be periodically updated. If we make any material changes, we will notify you by posting a notice in the Service prior to the change becoming effective. Your continued use of the Service after the effective date will be subject to the new Privacy Policy.

                    For purposes of data protection laws, Binod Bingo is the “data controller” of your personal information. 
            </p>
            <div>
                <h2>
                    Contact Us
                </h2>

                <p>
                        If you have any questions about data protection, or if you have any requests for resolving issues with your personal data, please contact us inside the game as that is usually the fastest channel of response.

                        Binod Bingo                        
                        email: sukhandeo@gmail.com
                </p>
            </div>
            <div>
                <h2>
                    The Data We Collect
                </h2>

                <p>
                    <ol type="A" className={privacyStyles.listPrivacy}>
                            <li>
                                    <h4>Data you provide us:</h4>
                            <ul className={privacyStyles.listItem}>
                                <li>
                                        1. Contact information (such as name and email address)
                                </li>
                                    <li>
                                        2. Your messages to the other players
                                    </li>
                                    <li>
                                        3. Other data you choose to give us (such as data for profile image)
                                    </li>
                            </ul>
                        </li>
                        <li>
                            <h4>
                                    Data we collect automatically:
                            </h4>
                            <ul className={privacyStyles.listItem}>
                                <li>
                                       1. Data about your account and game progress
                                </li>
                                <li>
                                       2. Your IP address and mobile device identifiers (such as your device ID, advertising ID, MAC address, IMEI)

                                </li>
                                <li>
                                       3. Data about your device, such as device name and operating system, browser type and language

                                </li>
                                <li>
                                       4. Data we collect with cookies and similar technologies (see more below)

                                </li>
                                <li>
                                       5. General location data

                                </li>
                                <li>
                                       6. Data about your use of the Service, such as gameplay data and your interactions with other players inside the Service

                                </li>
                            </ul>
                        </li>
                        <li>
                            <h4>
                                    Data we collect from our partners:
                            </h4>

                            <ul className={privacyStyles.listItem}>
                                <li>
                                      1. Data we receive if you link a third party tool with the Service (such as Apple, Amazon, Facebook or Google)
                                </li>
                                <li>
                                       2. Demographic data (such as to determine the coarse location of your IP address)

                                </li>
                                <li>
                                       3. Data to fight fraud (such as refund abuse in games or click fraud in advertising)

                                </li>
                                <li>
                                       4. Data for advertising and analytics purposes, so we can provide you a better Service

                                </li>

                            </ul>
                        </li>
                        </ol>       
                </p>
            </div>
        </div>
    </>
    )
}

export default Privacy;